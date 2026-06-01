"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <section className="container mx-auto min-h-[60vh] px-6 py-16">
        <p className="text-muted-foreground">Loading profile...</p>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="container mx-auto min-h-[60vh] px-6 py-16">
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Please sign in to view your profile.</p>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </section>
    );
  }

  const user = session.user;

  return (
    <section className="container mx-auto min-h-[60vh] px-6 py-16">
      <div className="max-w-2xl rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "Profile image"}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-3xl font-semibold">{user?.name?.charAt(0) || "P"}</span>
            )}
          </div>

          <div className="min-w-0 space-y-2">
            <h1 className="truncate text-3xl font-bold">{user?.name || "Patient Profile"}</h1>
            {user?.email ? <p className="truncate text-muted-foreground">{user.email}</p> : null}
            <div className="flex flex-wrap gap-2 pt-2 text-sm">
              {user?.role ? (
                <span className="rounded-md bg-background px-3 py-1 text-foreground">{user.role}</span>
              ) : null}
              {user?.publicId ? (
                <span className="rounded-md bg-background px-3 py-1 text-foreground">
                  ID: {user.publicId}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
