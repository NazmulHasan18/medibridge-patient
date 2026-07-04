"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Activity, LogOut, Menu, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { data: session, status } = useSession();
  const sessionData = session as
    | (typeof session & {
        name?: string;
        email?: string;
        picture?: string;
      })
    | null;
  const isAuthenticated = status === "authenticated" && !!session;
  const userName = session?.user?.name || sessionData?.name || "Profile";
  const userEmail = session?.user?.email || sessionData?.email;
  const userImage = session?.user?.image || sessionData?.picture;

  const navItems = [
    { name: "Home", path: "/" },
    ...(session?.user
      ? [
          {
            name: "Dashboard",
            path: `/${session.user.role.toLowerCase() === "super_admin" ? "admin" : session.user.role.toLowerCase()}`,
          },
        ]
      : []),
    { name: "Doctors", path: "/doctors" },
    { name: "Blogs", path: "/blogs" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const roleHome = session?.user
    ? `/${session.user.role.toLowerCase() === "super_admin" ? "admin" : session.user.role.toLowerCase()}`
    : "";

  const profileButton = (
    <Link
      href={`${roleHome}/profile`}
      className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#00A8E8] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-background shadow-sm ring-0 ring-[#00A8E8]/40 transition-all duration-200 group-hover:ring-2"
        title={userName}
      >
        {userImage ? (
          <Image
            width={40}
            height={40}
            src={userImage.trim()}
            alt={userName}
            className="h-full w-full object-cover"
          />
        ) : (
          <UserRound className="h-5 w-5 text-muted-foreground" />
        )}
      </span>
    </Link>
  );

  const authButtons = isAuthenticated ? (
    <>
      {profileButton}
      <Button
        variant="outline"
        className="gap-2 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        onClick={handleSignOut}
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </>
  ) : (
    <>
      <Link href="/login">
        <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
          Sign In
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button className="bg-gradient-to-r from-[#0077B6] to-[#00A8E8] text-white shadow-sm shadow-[#0077B6]/25 transition-transform hover:scale-[1.02] hover:shadow-md hover:shadow-[#0077B6]/30">
          Sign Up
        </Button>
      </Link>
    </>
  );

  const mobileAuthButtons = isAuthenticated ? (
    <div className="space-y-3 pt-2">
      <Link href={`${roleHome}/profile`} onClick={() => setOpen(false)} className="block">
        <Button variant="outline" className="w-full justify-start gap-3 border-border/80 active:scale-[0.98]">
          {userImage ? (
            <Image
              width={30}
              height={30}
              src={userImage.trim()}
              alt={userName}
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <UserRound className="h-4 w-4" />
          )}
          <span className="min-w-0 text-left">
            <span className="block max-w-full truncate">{userName}</span>
            {userEmail ? (
              <span className="block max-w-full truncate text-xs font-normal text-muted-foreground">
                {userEmail}
              </span>
            ) : null}
          </span>
        </Button>
      </Link>
      <Button
        variant="outline"
        className="w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground active:scale-[0.98]"
        onClick={() => {
          setOpen(false);
          handleSignOut();
        }}
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  ) : (
    <div className="space-y-3 pt-2">
      <Link href="/login" onClick={() => setOpen(false)}>
        <Button variant="outline" className="w-full active:scale-[0.98]">
          Sign In
        </Button>
      </Link>
      <Link href="/sign-up" onClick={() => setOpen(false)}>
        <Button className="w-full bg-gradient-to-r from-[#0077B6] to-[#00A8E8] text-white active:scale-[0.98]">
          Sign Up
        </Button>
      </Link>
    </div>
  );

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full border-b backdrop-blur-xl backdrop-saturate-150 transition-all duration-300",
        scrolled
          ? "border-border/60 bg-background/85 shadow-sm shadow-slate-900/5 dark:shadow-black/20"
          : "border-transparent bg-background/50",
      )}
    >
      <nav className="container relative mx-auto flex items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#00A8E8]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0077B6] to-[#00A8E8] text-white shadow-sm shadow-[#0077B6]/30 transition-transform duration-200 group-hover:scale-105">
            <Activity className="h-4.5 w-4.5" strokeWidth={2.5} />
          </span>
          <span className="bg-gradient-to-r from-[#0077B6] to-[#00A8E8] bg-clip-text text-xl font-bold tracking-tight text-transparent">
            MediBridge
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-1 rounded-full border border-border/60 bg-muted/40 p-1 md:flex">
          {navItems.map((item, i) => {
            const isActive = path === item.path;
            return (
              <li key={i}>
                <Link
                  href={item.path}
                  className={clsx(
                    "relative block rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#00A8E8]",
                    isActive
                      ? "bg-gradient-to-r from-[#0077B6] to-[#00A8E8] text-white shadow-sm shadow-[#0077B6]/25"
                      : "text-foreground/70 hover:bg-background hover:text-foreground",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <span className="mx-1 h-6 w-px bg-border" aria-hidden="true" />
          {authButtons}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="hover:bg-muted">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent title="Navigators" side="left" className="flex flex-col p-6">
              <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#0077B6] to-[#00A8E8] text-white">
                  <Activity className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <span className="bg-gradient-to-r from-[#0077B6] to-[#00A8E8] bg-clip-text text-transparent">
                  MediBridge
                </span>
              </SheetTitle>
              <nav className="mt-6 flex flex-1 flex-col justify-between">
                <ul className="flex flex-col gap-1 text-base">
                  {navItems.map((item, i) => {
                    const isActive = path === item.path;
                    return (
                      <li key={i}>
                        <Link
                          href={item.path}
                          onClick={() => setOpen(false)}
                          className={clsx(
                            "block rounded-lg px-3 py-2.5 font-medium transition-colors duration-200",
                            isActive
                              ? "bg-gradient-to-r from-[#0077B6]/10 to-[#00A8E8]/10 text-[#0077B6] dark:text-[#00A8E8]"
                              : "text-foreground/80 hover:bg-muted",
                          )}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {mobileAuthButtons}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
