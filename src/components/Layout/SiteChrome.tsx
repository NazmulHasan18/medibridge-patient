"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const dashboardRoots = ["/admin", "/doctor", "/patient"];

const SiteChrome = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isDashboard = dashboardRoots.some(
    (root) => pathname === root || pathname.startsWith(`${root}/`),
  );

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>
        {children}
        <Footer />
      </main>
    </>
  );
};

export default SiteChrome;
