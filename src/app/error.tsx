"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & {
    digest?: string;
    status?: number;
    data?: {
      message?: string;
      errors?: unknown;
    };
  };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const status = error.status || 500;
  const message = error.data?.message || error.message || "Something went wrong.";

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold">{status}</h1>

      <h2 className="mt-4 text-2xl font-semibold">Oops! Something went wrong</h2>

      <p className="mt-2 max-w-md text-muted-foreground">{message}</p>

      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()}>Try Again</Button>

        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go Home
        </Button>
      </div>
    </div>
  );
}
