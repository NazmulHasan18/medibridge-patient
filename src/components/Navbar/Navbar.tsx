"use client";

import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, UserRound } from "lucide-react";
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
    ...(session?.user
      ? [
          {
            name: "Dashboard",
            path: `/${session.user.role.toLowerCase() === "super_admin" ? "admin" : session.user.role.toLowerCase()}`,
          },
        ]
      : []),
    { name: "Doctors", path: "/doctors" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact-us" },
  ];

  const [open, setOpen] = useState(false);
  const path = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };
  console.log(userImage);

  const profileButton = (
    <Link
      href={`/${session?.user.role.toLowerCase() === "super_admin" ? "admin" : session?.user.role.toLowerCase()}/profile`}
      className="group relative flex h-10 w-10 items-center justify-center"
    >
      <span
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-accent"
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
          <UserRound className="h-5 w-5" />
        )}
      </span>
    </Link>
  );

  const authButtons = isAuthenticated ? (
    <>
      {profileButton}
      <Button variant="destructive" className="gap-2" onClick={handleSignOut}>
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </>
  ) : (
    <>
      <Link href="/login">
        <Button variant="outline">Sign In</Button>
      </Link>
      <Link href="/sign-up">
        <Button>Sign Up</Button>
      </Link>
    </>
  );

  const mobileAuthButtons = isAuthenticated ? (
    <div className="space-y-3 pt-2">
      <Link
        href={`/${session.user.role.toLowerCase() === "super_admin" ? "admin" : session.user.role.toLowerCase()}/profile`}
        onClick={() => setOpen(false)}
        className="block"
      >
        <Button variant="outline" className="w-full justify-start gap-3 active:scale-95">
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
        variant="destructive"
        className="w-full gap-2 active:scale-95"
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
    <>
      <Link href="/login" onClick={() => setOpen(false)}>
        <Button variant="outline" className="w-full active:scale-95">
          Sign In
        </Button>
      </Link>
      <Link href="/sign-up" onClick={() => setOpen(false)}>
        <Button className="w-full active:scale-95">Sign Up</Button>
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden border-b border-white/30 bg-white/65 shadow-sm shadow-slate-900/5 backdrop-blur-xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.65),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(0,168,232,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.08))] before:opacity-80 dark:border-white/10 dark:bg-background/70 dark:shadow-black/20 dark:before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(0,168,232,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
      <nav className="container relative z-10 mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-500">
          MediBridge
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-foreground">
          <li>
            <Link
              href={`/`}
              className={clsx(
                "hover:text-blue-600 font-medium text-black",
                "dark:text-foreground",
                path === "/" ? "underline text-primary" : "bg-none",
              )}
            >
              Home
            </Link>
          </li>
          {navItems.map((item, i) => (
            <li key={i}>
              <Link
                href={item.path}
                className={clsx(
                  "hover:text-blue-600 font-medium text-black",
                  "dark:text-foreground",
                  path === item.path ? "underline text-primary" : "bg-none",
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          {authButtons}
        </div>

        {/* Mobile Menu Button test */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent title="Navigators" side="left" className="p-6">
              <SheetTitle className="text-2xl font-bold text-blue-600 ">MediBridge</SheetTitle>
              <nav className="flex flex-col space-y-4 text-lg">
                <Link
                  href={`/`}
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md transition-all duration-200 active:bg-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Home
                </Link>
                {navItems.map((item, i) => (
                  <Link
                    key={i}
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-md transition-all duration-200 active:bg-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
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
