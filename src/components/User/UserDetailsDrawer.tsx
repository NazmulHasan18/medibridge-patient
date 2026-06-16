"use client";

import { X, Mail, Phone, Shield, Calendar, Clock } from "lucide-react";
import { RoleBadge, StatusBadge } from "./StatusBadge";
import Image from "next/image";
import { useUserById } from "@/hooks/user/useUser";

interface UserDetailDrawerProps {
  userId: number | null;
  onClose: () => void;
}

export function UserDetailDrawer({ userId, onClose }: UserDetailDrawerProps) {
  const { data: user, isLoading } = useUserById(userId);

  if (!userId) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 z-50 flex w-[420px] flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-800">User Details</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          </div>
        ) : user ? (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Avatar + name */}
            <div className="mb-6 flex flex-col items-center gap-3 text-center">
              {user.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt={user.name}
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-slate-200"
                  width={600}
                  height={600}
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{user.name}</h3>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <RoleBadge role={user.role} />
                  <StatusBadge status={user.status} />
                </div>
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-4">
              <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={user.email} />
              {user.phone && (
                <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={user.phone} />
              )}
              <InfoRow icon={<Shield className="h-4 w-4" />} label="User ID" value={`#${user.id}`} />
              <InfoRow
                icon={<Calendar className="h-4 w-4" />}
                label="Joined"
                value={new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />
              <InfoRow
                icon={<Clock className="h-4 w-4" />}
                label="Last updated"
                value={new Date(user.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />
              {user.deletedAt && (
                <InfoRow
                  icon={<Clock className="h-4 w-4 text-red-500" />}
                  label="Deleted at"
                  value={new Date(user.deletedAt).toLocaleDateString()}
                  valueClass="text-red-500"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-slate-400">User not found</div>
        )}
      </aside>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
  valueClass = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
      <span className="mt-0.5 text-slate-400">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">{label}</p>
        <p className={`mt-0.5 truncate text-sm font-medium text-slate-700 ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
}
