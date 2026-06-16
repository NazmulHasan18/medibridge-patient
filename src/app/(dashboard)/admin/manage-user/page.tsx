"use client";

import { useState, useCallback } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { Search, Filter, Users } from "lucide-react";
import { GetUsersParams, User, UserRole, UserStatus } from "@/types/user.types";
import { useDeleteUser, useRestoreUser, useUsers } from "@/hooks/user/useUser";
import Image from "next/image";
import { RoleSelect } from "@/components/User/RoleSelect";
import { StatusBadge } from "@/components/User/StatusBadge";
import { RowActions } from "@/components/User/RowAction";
import { DataTable } from "@/components/User/Datatable";
import { Pagination } from "@/components/User/Pagination";
import { UserDetailDrawer } from "@/components/User/UserDetailsDrawer";
import { ConfirmDialog } from "@/components/User/ConfirmDialog";

const ROLES: Array<UserRole | ""> = ["", "ADMIN", "DOCTOR", "PATIENT", "STAFF"];
const STATUSES: Array<UserStatus | ""> = ["", "ACTIVE", "INACTIVE", "SUSPENDED", "DELETED"];

export default function UserManagementPage() {
  /* ── Filters & pagination state ── */
  const [params, setParams] = useState<GetUsersParams>({
    page: 1,
    limit: 10,
    search: "",
    role: "",
    status: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  /* ── UI state ── */
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [restoreTarget, setRestoreTarget] = useState<User | null>(null);

  /* ── Data ── */
  const { data, isLoading, isFetching } = useUsers(params);
  console.log(data);
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: restoreUser, isPending: isRestoring } = useRestoreUser();

  /* ── Sorting ── */
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);

  const handleSortingChange = useCallback(
    (updater: SortingState | ((prev: SortingState) => SortingState)) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      setSorting(next);
      if (next.length > 0) {
        setParams((p) => ({
          ...p,
          sortBy: next[0].id,
          sortOrder: next[0].desc ? "desc" : "asc",
          page: 1,
        }));
      }
    },
    [sorting],
  );

  /* ── Table columns ── */
  const columns: ColumnDef<User, unknown>[] = [
    {
      id: "user",
      header: "User",
      cell: ({ row }) => {
        const u = row.original;
        return (
          <div className="flex items-center gap-3">
            {u.profileImage ? (
              <Image
                src={u.profileImage}
                alt={u.name}
                className="h-9 w-9 rounded-full object-cover"
                width={600}
                height={600}
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                {u.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800">{u.name}</p>
              <p className="truncate text-xs text-slate-500">{u.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      id: "role",
      header: "Role",
      enableSorting: false,
      cell: ({ row }) => <RoleSelect userId={row.original.id} currentRole={row.original.role} />,
    },
    {
      id: "status",
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      enableSorting: true,
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <RowActions
          user={row.original}
          onView={() => setSelectedUserId(row.original.id)}
          onDelete={() => setDeleteTarget(row.original)}
          onRestore={() => setRestoreTarget(row.original)}
        />
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((p) => ({ ...p, search: e.target.value, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-slate-50/60 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Management</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage accounts, roles, and access across the platform.
            </p>
          </div>
          {data && (
            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-slate-200">
              <Users className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-semibold text-slate-700">{data.meta.total.toLocaleString()}</span>
              <span className="text-xs text-slate-400">total users</span>
            </div>
          )}
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[260px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email…"
              value={params.search}
              onChange={handleSearch}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Role filter */}
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <select
              value={params.role}
              onChange={(e) => setParams((p) => ({ ...p, role: e.target.value as UserRole | "", page: 1 }))}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r || "All Roles"}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <select
            value={params.status}
            onChange={(e) => setParams((p) => ({ ...p, status: e.target.value as UserStatus | "", page: 1 }))}
            className="appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s || "All Statuses"}
              </option>
            ))}
          </select>

          {/* Limit */}
          <select
            value={params.limit}
            onChange={(e) => setParams((p) => ({ ...p, limit: Number(e.target.value), page: 1 }))}
            className="appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        </div>

        {/* ── Table ── */}
        <div className={isFetching && !isLoading ? "opacity-70 transition-opacity" : ""}>
          <DataTable
            columns={columns}
            data={data?.data ?? []}
            isLoading={isLoading}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            emptyMessage="No users match the current filters."
          />
        </div>

        {/* ── Pagination ── */}
        {data && data.meta.totalPages > 1 && (
          <Pagination
            page={data.meta.page}
            totalPages={data.meta.totalPages}
            total={data.meta.total}
            limit={data.meta.limit}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        )}
      </div>

      {/* ── Detail Drawer ── */}
      <UserDetailDrawer userId={selectedUserId} onClose={() => setSelectedUserId(null)} />

      {/* ── Delete Confirm ── */}
      <ConfirmDialog
        open={!!deleteTarget}
        title={`Delete ${deleteTarget?.name}?`}
        description="This will soft-delete the user. You can restore them later from the actions menu."
        confirmLabel="Delete"
        variant="danger"
        isPending={isDeleting}
        onConfirm={() => {
          if (deleteTarget) {
            deleteUser(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* ── Restore Confirm ── */}
      <ConfirmDialog
        open={!!restoreTarget}
        title={`Restore ${restoreTarget?.name}?`}
        description="The user's account will be reactivated and they can log in again."
        confirmLabel="Restore"
        variant="warning"
        isPending={isRestoring}
        onConfirm={() => {
          if (restoreTarget) {
            restoreUser(restoreTarget.id, { onSuccess: () => setRestoreTarget(null) });
          }
        }}
        onCancel={() => setRestoreTarget(null)}
      />
    </div>
  );
}
