export default function Loading() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner — soft blue, matches brand accent */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-blue-100 dark:border-blue-400/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-blue-600 dark:border-t-blue-400" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">Loading, just a moment…</p>
      </div>
    </section>
  );
}
