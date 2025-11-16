"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, Activity, Users, Newspaper, Stethoscope, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthUser, PetugasRole } from "@/types";

interface AdminMobileSidebarProps {
  user: AuthUser | null;
  onLogout: () => void;
}

const AdminMobileSidebar = ({ user, onLogout }: AdminMobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeSheet = () => setIsOpen(false);

  const navItems = [
    {
      name: "Dasbor Ringkasan",
      icon: Home,
      path: "/admin/dashboard",
      roles: ["admin", "petugas"],
    },
    {
      name: "Kelola Kegiatan",
      icon: Activity,
      path: "/admin/kegiatan",
      roles: ["admin"],
    },
    {
      name: "Kelola Pasien",
      icon: Stethoscope,
      path: "/admin/pasien",
      roles: ["admin", "petugas"],
    },
    {
      name: "Kelola Petugas",
      icon: Users,
      path: "/admin/petugas",
      roles: ["admin"],
    },
    {
      name: "Kelola Berita",
      icon: Newspaper,
      path: "/admin/berita",
      roles: ["admin"],
    },
    {
      name: "Kelola Rekam Medik",
      icon: FileText,
      path: "/admin/rekam-medik",
      roles: ["admin", "petugas"],
    },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(user?.role || ""));

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle admin navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col bg-primary-blue text-white">
        <Link to="/admin/dashboard" className="text-2xl font-bold mb-8 text-center" onClick={closeSheet}>
          PCC Admin
        </Link>
        <nav className="flex-grow">
          <ul className="space-y-2">
            {filteredNavItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-white hover:text-primary-blue",
                    location.pathname === item.path && "bg-white text-primary-blue"
                  )}
                  onClick={closeSheet}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-primary-blue/50">
          <div className="text-sm text-gray-200 mb-2">
            Logged in as: <span className="font-semibold">{user?.nama} ({user?.role})</span>
          </div>
          <Button
            onClick={() => { onLogout(); closeSheet(); }}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminMobileSidebar;