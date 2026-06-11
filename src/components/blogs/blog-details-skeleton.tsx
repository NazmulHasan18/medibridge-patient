import { Skeleton } from "@/components/ui/skeleton";

export function BlogDetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Back */}
      <Skeleton className="mb-6 h-8 w-28" />

      {/* Thumbnail */}
      <Skeleton className="mb-8 aspect-[21/9] w-full rounded-xl" />

      {/* Title */}
      <Skeleton className="h-10 w-3/4 rounded" />
      <Skeleton className="mt-3 h-5 w-1/3 rounded" />

      {/* Layout */}
      <div className="mt-10 flex gap-10">
        <div className="flex-1 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded" />
          ))}
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
        <div className="hidden w-64 shrink-0 lg:block">
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
