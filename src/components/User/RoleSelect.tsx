"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { RoleBadge } from "./StatusBadge";
import { useUpdateRole } from "@/hooks/user/useUser";
import { UserRole } from "@/types/user.types";

const ROLES: UserRole[] = ["ADMIN", "DOCTOR", "PATIENT", "STAFF"];

interface RoleSelectProps {
  userId: number;
  currentRole: UserRole;
}

export function RoleSelect({ userId, currentRole }: RoleSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { mutate, isPending } = useUpdateRole();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (role: UserRole) => {
    if (role === currentRole) {
      setOpen(false);
      return;
    }
    mutate({ id: userId, role }, { onSettled: () => setOpen(false) });
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={isPending}
        className="flex items-center gap-1 rounded-md p-0.5 hover:ring-2 hover:ring-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        {isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-400" />
        ) : (
          <>
            <RoleBadge role={currentRole} />
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1.5 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => handleSelect(role)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-slate-50 ${
                role === currentRole ? "bg-slate-50" : ""
              }`}
            >
              <RoleBadge role={role} />
              {role === currentRole && <span className="ml-auto text-xs text-indigo-500">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
