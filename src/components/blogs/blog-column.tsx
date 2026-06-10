"use client";

import { Blog } from "@/types/blog.types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const blogColumns: ColumnDef<Blog>[] = [
  {
    id: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "blog",
    header: "Blog",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        {row.original.thumbnail ? (
          <Image
            src={row.original.thumbnail}
            alt={row.original.title}
            width={48}
            height={48}
            className="h-12 w-12 rounded-md object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
            No img
          </div>
        )}
        <div className="max-w-[220px]">
          <p className="line-clamp-1 font-medium">{row.original.title}</p>
          <p className="text-xs text-muted-foreground">/{row.original.slug}</p>
        </div>
      </div>
    ),
  },
  {
    id: "comments",
    header: "Comments",
    cell: ({ row }) => (
      <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
        {row.original._count?.comments ?? 0} comments
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Published",
    cell: ({ row }) =>
      new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(row.original.createdAt)),
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) =>
      new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(row.original.updatedAt)),
  },
];
