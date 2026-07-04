import Link from "next/link";
import { ShieldOff, LogIn } from "lucide-react";
import InteractiveGlow from "@/components/Interactive/InteractiveGlow";

// Use as app/unauthorized.tsx and call `unauthorized()` from Next's
// `next/navigation` in server components/middleware (Next.js 15+),
// or render directly as a route for 401/403 states.
export default function Unauthorized() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <InteractiveGlow />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-amber-300/10 blur-[120px]" />
        <div className="absolute bottom-0 -right-24 h-[360px] w-[360px] rounded-full bg-blue-300/15 blur-[110px]" />
      </div>

      <div className="relative mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-400/10 text-amber-600 ring-1 ring-inset ring-amber-500/10 dark:text-amber-400">
          <ShieldOff className="h-7 w-7" strokeWidth={1.75} />
        </div>

        <span className="mt-6 text-sm font-medium tracking-wide text-amber-600 dark:text-amber-400">
          403 · Restricted
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          You don&apos;t have access
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          This area is restricted, or your session may have expired. Sign in with an account that has
          permission to view it.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <LogIn className="h-4 w-4" strokeWidth={1.75} />
            Sign in
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
