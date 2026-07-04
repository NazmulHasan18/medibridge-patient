"use client";

import { useEffect } from "react";
import { ServerCrash, RotateCw } from "lucide-react";

// global-error.tsx replaces the root layout when it throws, so it must
// render its own <html> and <body> tags.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full bg-red-200/30 blur-[120px]" />
            <div className="absolute bottom-0 -right-24 h-[360px] w-[360px] rounded-full bg-blue-200/30 blur-[110px]" />
          </div>

          <div className="relative mx-auto flex max-w-lg flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-400/10 text-red-600 ring-1 ring-inset ring-red-500/10">
              <ServerCrash className="h-7 w-7" strokeWidth={1.75} />
            </div>

            <span className="mt-6 text-sm font-medium tracking-wide text-red-600">Application error</span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              MediBridge hit a critical error
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              Something went wrong at the application level. Please try again — if this keeps happening,
              contact support.
            </p>

            {error.digest && (
              <p className="mt-3 rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-500">
                Error ID: {error.digest}
              </p>
            )}

            <button
              onClick={() => reset()}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
            >
              <RotateCw className="h-4 w-4" strokeWidth={1.75} />
              Try again
            </button>
          </div>
        </section>
      </body>
    </html>
  );
}
