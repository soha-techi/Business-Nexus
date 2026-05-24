import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  MessageCircle,
  User,
  FileText,
  Settings,
  Calendar,
  Wallet,
  Video,       // <-- Conference Room ke liye video icon add kiya
  Briefcase,   // <-- Document Chamber ke liye briefcase icon add kiya
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Investor Menu Items
  const investorMenuItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/entrepreneurs", icon: Users, label: "Entrepreneurs" },
    { path: "/requests", icon: FileText, label: "My Requests" },
    { path: "/messages", icon: MessageCircle, label: "Messages" },
    
    // Naye Sections add kiye tarteeb se
    { path: "/video-room", icon: Video, label: "Conference Room" },
    { path: "/document-chamber", icon: Briefcase, label: "Document Chamber" },
    { path: "/payments", icon: Wallet, label: "Payments Wallet" },
    
    { path: "/calendar", icon: Calendar, label: "Meeting Calendar" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  // Entrepreneur Menu Items
  const entrepreneurMenuItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/investors", icon: Users, label: "Investors" },
    { path: "/requests", icon: FileText, label: "Requests" },
    { path: "/messages", icon: MessageCircle, label: "Messages" },
    
    // Naye Sections add kiye tarteeb se
    { path: "/video-room", icon: Video, label: "Conference Room" },
    { path: "/document-chamber", icon: Briefcase, label: "Document Chamber" },
    { path: "/payments", icon: Wallet, label: "Payments Wallet" },
    
    { path: "/calendar", icon: Calendar, label: "Meeting Calendar" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  const menuItems =
    user?.role === "investor" ? investorMenuItems : entrepreneurMenuItems;

  return (
    <>
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 h-full transition-colors flex-shrink-0">
        <div className="p-6 h-full overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar overlay for mobile */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 z-50 transition-transform duration-200 md:hidden">
            <div className="p-6 h-full overflow-y-auto">
              <button
                className="mb-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive(item.path)
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};