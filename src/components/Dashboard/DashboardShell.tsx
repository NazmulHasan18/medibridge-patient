"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  // Activity,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  // FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Pill,
  // Settings,
  Stethoscope,
  UserCog,
  Users,
  // ShieldCheck,
  HomeIcon,
  NotebookPen,
} from "lucide-react";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

// ─── Nav definitions ────────────────────────────────────────────────────────

const navByRole = {
  super_admin: [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    // { label: "Admin", href: "/admin/admins", icon: ShieldCheck },
    { label: "Manage User", href: "/admin/manage-user", icon: UserCog },
    { label: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
    { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
    { label: "Patients", href: "/admin/patients", icon: Users },
    // { label: "Reports", href: "/admin/reports", icon: FileText },
    // { label: "Settings", href: "/admin/settings", icon: Settings },
  ],
  admin: [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Manage User", href: "/admin/manage-user", icon: UserCog },
    { label: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
    { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
    { label: "Patients", href: "/admin/patients", icon: Users },
    // { label: "Reports", href: "/admin/reports", icon: FileText },
    // { label: "Settings", href: "/admin/settings", icon: Settings },
  ],
  doctor: [
    { label: "Overview", href: "/doctor", icon: LayoutDashboard },
    { label: "Schedule", href: "/doctor/schedule", icon: CalendarCheck },
    { label: "Appointments", href: "/doctor/appointments", icon: ClipboardList },
    { label: "Patients", href: "/doctor/patients", icon: Users },
    { label: "Prescriptions", href: "/doctor/prescriptions", icon: Pill },
    { label: "Blogs", href: "/doctor/blogs", icon: NotebookPen },
    { label: "Profile", href: "/doctor/profile", icon: UserCog },
  ],
  patient: [
    { label: "Overview", href: "/patient", icon: LayoutDashboard },
    { label: "Appointments", href: "/patient/appointments", icon: CalendarCheck },
    // { label: "Medical Records", href: "/patient/medical-records", icon: Activity },
    { label: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
    { label: "Billing", href: "/patient/billing", icon: CreditCard },
    { label: "Profile", href: "/patient/profile", icon: UserCog },
  ],
} as const;

type Role = keyof typeof navByRole;

const roleHome: Record<Role, string> = {
  super_admin: "/admin",
  admin: "/admin",
  doctor: "/doctor",
  patient: "/patient",
};

const roleLabel: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin Panel",
  doctor: "Doctor Portal",
  patient: "Patient Portal",
};

// Roles that get a persistent sidebar instead of a top nav
const SIDEBAR_ROLES: Role[] = ["super_admin", "admin", "patient", "doctor"];

// ─── Role normalizer ────────────────────────────────────────────────────────

const normalizeRole = (role?: string): Role => {
  const r = role?.toLowerCase();
  if (r === "super_admin") return "super_admin";
  if (r === "admin") return "admin";
  if (r === "doctor") return "doctor";
  return "patient";
};

// ─── Shell ──────────────────────────────────────────────────────────────────

const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const role = normalizeRole(session?.user?.role);
  const navItems = useMemo(() => navByRole[role], [role]);
  const hasSidebar = SIDEBAR_ROLES.includes(role);

  // Redirect if the user lands on the wrong root path
  useEffect(() => {
    if (status !== "authenticated") return;
    const currentRoot = pathname.split("/")[1];
    const expectedRoot = roleHome[role].replace("/", "");
    if (currentRoot && currentRoot !== expectedRoot) {
      router.replace(roleHome[role]);
    }
  }, [pathname, role, router, status]);

  const userName = session?.user?.name || roleLabel[role];
  const userEmail = session?.user?.email;

  // ── Shared nav link list ─────────────────────────────────────────────────
  const navLinks = (
    <div className="flex flex-col justify-between">
      <nav className="space-y-1">
        <Link
          href={"/"}
          onClick={() => setOpen(false)}
          className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <HomeIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">Home</span>
        </Link>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <Button
        variant="destructive"
        className="sm:hidden h-10 w-full rounded-md px-3 text-sm font-medium transition-colors inline-flex"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );

  // ── Loading / unauthenticated states ─────────────────────────────────────
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md rounded-lg border border-border bg-card p-6 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Sign in required</h1>
          <p className="mt-2 text-muted-foreground">Please sign in to access your MediBridge dashboard.</p>
          <Link href="/login" className="mt-5 inline-flex">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  // ── Authenticated layout ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 text-foreground dark:bg-background">
      {/* ── Sidebar (admin / super_admin only) ── */}
      {hasSidebar && (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-card px-4 py-5 shadow-sm lg:block">
          <Link
            href={roleHome[role]}
            className="flex items-center gap-3 px-2 text-2xl font-bold text-primary"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Home className="h-5 w-5" />
            </span>
            MediBridge
          </Link>

          {/* Role badge */}
          <p className="mt-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {roleLabel[role]}
          </p>

          <div className="mt-6">{navLinks}</div>
        </aside>
      )}

      {/* ── Main content area ── */}
      <div className={clsx(hasSidebar && "lg:pl-72")}>
        {/* ── Header ── */}
        <header className="sticky top-0 z-30 border-b border-white/30 bg-white/75 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-background/80">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {/* Left: hamburger (sidebar roles on mobile) + logo/name */}
            <div className="flex min-w-0 items-center gap-3">
              {hasSidebar ? (
                // Mobile hamburger for sidebar roles
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72 p-5">
                    <SheetTitle className="text-left text-2xl font-bold text-primary">MediBridge</SheetTitle>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {roleLabel[role]}
                    </p>
                    <div className="mt-6">{navLinks}</div>
                  </SheetContent>
                </Sheet>
              ) : (
                // Logo link for top-nav roles (doctor / patient)
                <Link href={roleHome[role]} className="text-2xl font-bold text-primary">
                  MediBridge
                </Link>
              )}

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {roleLabel[role]}
                </p>
                <p className="truncate text-base font-semibold">{userName}</p>
              </div>
            </div>

            {/* Centre: inline top-nav (doctor / patient, md+) */}
            {!hasSidebar && <nav className="hidden items-center gap-1 md:flex">{navLinks}</nav>}

            {/* Right: theme toggle + mobile sheet for top-nav roles + sign out */}
            <div className="flex shrink-0 items-center gap-2">
              <ThemeToggle />

              {/* Mobile hamburger for top-nav roles */}
              {!hasSidebar && (
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="p-5">
                    <SheetTitle className="text-left text-2xl font-bold text-primary">
                      {roleLabel[role]}
                    </SheetTitle>
                    <div className="mt-8">{navLinks}</div>
                  </SheetContent>
                </Sheet>
              )}

              <Button
                variant="outline"
                className="hidden gap-2 sm:inline-flex"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {userEmail && (
            <div className="border-t border-border/60 px-4 py-2 text-sm text-muted-foreground sm:px-6 lg:px-8">
              {userEmail}
            </div>
          )}
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardShell;
