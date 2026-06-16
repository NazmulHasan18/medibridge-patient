"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Eye, Trash2, RotateCcw } from "lucide-react";
import type { User } from "../../types/user.types";

interface RowActionsProps {
  user: User;
  onView: () => void;
  onDelete: () => void;
  onRestore: () => void;
}

export function RowActions({ user, onView, onDelete, onRestore }: RowActionsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isDeleted = user.status === "DELETED" || !!user.deletedAt;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex justify-end">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          <ActionItem
            icon={<Eye className="h-4 w-4" />}
            label="View details"
            onClick={() => {
              onView();
              setOpen(false);
            }}
          />

          {isDeleted ? (
            <ActionItem
              icon={<RotateCcw className="h-4 w-4" />}
              label="Restore user"
              onClick={() => {
                onRestore();
                setOpen(false);
              }}
              className="text-emerald-600 hover:bg-emerald-50"
            />
          ) : (
            <ActionItem
              icon={<Trash2 className="h-4 w-4" />}
              label="Delete user"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="text-red-600 hover:bg-red-50"
            />
          )}
        </div>
      )}
    </div>
  );
}

function ActionItem({
  icon,
  label,
  onClick,
  className = "text-slate-700 hover:bg-slate-50",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition ${className}`}
    >
      {icon}
      {label}
    </button>
  );
}
