"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCw } from "lucide-react";
import InteractiveGlow from "@/components/Interactive/InteractiveGlow";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log to your monitoring service (Sentry, etc.)
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <InteractiveGlow />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full bg-red-300/10 blur-[120px]" />
        <div className="absolute bottom-0 -right-24 h-[360px] w-[360px] rounded-full bg-blue-300/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-400/10 text-red-600 ring-1 ring-inset ring-red-500/10 dark:text-red-400">
          <AlertTriangle className="h-7 w-7" strokeWidth={1.75} />
        </div>

        <span className="mt-6 text-sm font-medium tracking-wide text-red-600 dark:text-red-400">
          Something went wrong
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">We hit a snag</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          An unexpected error occurred while loading this page. Your data is safe — try again, or head back
          home.
        </p>

        {error.digest && (
          <p className="mt-3 rounded-lg bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <RotateCw className="h-4 w-4" strokeWidth={1.75} />
            Try again
          </button>
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
