import React, { useState } from "react";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { GuidedTour } from "../ui/GuidedTour";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onRefresh?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  onRefresh,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Listen for focus events to refresh data when user returns to tab
  useEffect(() => {
    const handleFocus = () => {
      if (onRefresh) {
        onRefresh();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [onRefresh]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors relative">
      {/* 1. Top Navbar */}
      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* 2. Sidebar Navigation */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* 3. Main Dynamic Content Pages */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>

      {/* ⭐ MILESTONE 7: Guided Tour Button floating perfectly at the bottom-right */}
      <GuidedTour />
    </div>
  );
};
