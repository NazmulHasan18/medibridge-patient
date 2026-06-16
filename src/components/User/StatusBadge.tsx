import type { UserRole, UserStatus } from "../../types/user.types";

const STATUS_STYLES: Record<UserStatus, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  INACTIVE: "bg-slate-100 text-slate-600 ring-slate-200",
  SUSPENDED: "bg-amber-50 text-amber-700 ring-amber-200",
  DELETED: "bg-red-50 text-red-600 ring-red-200",
};

const STATUS_DOT: Record<UserStatus, string> = {
  ACTIVE: "bg-emerald-500",
  INACTIVE: "bg-slate-400",
  SUSPENDED: "bg-amber-500",
  DELETED: "bg-red-500",
};

export function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

const ROLE_STYLES: Record<UserRole, string> = {
  ADMIN: "bg-purple-50 text-purple-700 ring-purple-200",
  DOCTOR: "bg-blue-50 text-blue-700 ring-blue-200",
  PATIENT: "bg-teal-50 text-teal-700 ring-teal-200",
  STAFF: "bg-orange-50 text-orange-700 ring-orange-200",
};

export function RoleBadge({ role }: { role: UserRole }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${ROLE_STYLES[role]}`}
    >
      {role.charAt(0) + role.slice(1).toLowerCase()}
    </span>
  );
}
