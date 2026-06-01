import React, { ReactNode } from "react";
import DashboardShell from "@/components/Dashboard/DashboardShell";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <DashboardShell>{children}</DashboardShell>;
};

export default DashboardLayout;
