import Link from "next/link";
import { CompassIcon, HomeIcon } from "lucide-react";
import InteractiveGlow from "@/components/Interactive/InteractiveGlow";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <InteractiveGlow />

      {/* Ambient background blobs — consistent with Hero/Services */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute bottom-0 -right-24 h-[360px] w-[360px] rounded-full bg-sky-300/20 blur-[110px]" />
      </div>

      <div className="relative mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-sky-400/10 text-blue-600 ring-1 ring-inset ring-blue-500/10 dark:text-blue-400">
          <CompassIcon className="h-7 w-7" strokeWidth={1.75} />
        </div>

        <span className="mt-6 text-sm font-medium tracking-wide text-blue-600 dark:text-blue-400">
          404 error
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          This page took a wrong turn
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, or may have moved. Let&apos;s get you back on
          track.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <HomeIcon className="h-4 w-4" strokeWidth={1.75} />
          Back to home
        </Link>
      </div>
    </section>
  );
}
