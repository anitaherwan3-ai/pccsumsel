import React, { ReactNode } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Home, Activity, Users, Newspaper, Stethoscope, FileText, Menu } from "lucide-react"; // Import Menu icon
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import AdminMobileSidebar from "@/components/Layout/AdminMobileSidebar"; // Import AdminMobileSidebar

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    toast.error("Anda harus login untuk mengakses halaman ini.");
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.info("Anda telah logout.");
    navigate("/login");
  };

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
  const currentTitle = filteredNavItems.find(item => location.pathname.startsWith(item.path))?.name || "Dasbor Admin";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for larger screens */}
      <aside className="hidden sm:flex w-64 bg-primary-blue text-white flex-col p-4 shadow-lg">
        <div className="text-2xl font-bold mb-8 text-center">
          <Link to="/admin/dashboard">PCC Admin</Link>
        </div>
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
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* Mobile sidebar trigger */}
          <AdminMobileSidebar user={user} onLogout={handleLogout} />
          <div className="flex-1 text-lg font-semibold text-primary-blue">
            {currentTitle}
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;