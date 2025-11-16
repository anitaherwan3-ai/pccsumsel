import React, { ReactNode } from "react";
// import { MadeWithDyad } from "@/components/made-with-dyad"; // Removed import
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import MobileNav from "@/components/Layout/MobileNav"; // Import MobileNav

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { isAuthenticated, logout } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary-blue">PCC Sumsel</span>
          </Link>
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav isAuthenticated={isAuthenticated} onLogout={logout} />
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-sm font-medium hover:text-primary-blue">Beranda</Link>
            <Link to="/#layanan" className="text-sm font-medium hover:text-primary-blue">Layanan</Link>
            <Link to="/#kegiatan" className="text-sm font-medium hover:text-primary-blue">Kegiatan</Link>
            <Link to="/#berita" className="text-sm font-medium hover:text-primary-blue">Berita</Link>
            {isAuthenticated ? (
              <>
                <Button variant="ghost" onClick={logout} className="text-sm font-medium text-red-500 hover:text-red-700">Logout</Button>
                <Link to="/admin/dashboard">
                  <Button className="bg-primary-blue hover:bg-primary-blue/90">Dasbor Admin</Button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-primary-blue hover:bg-primary-blue/90">Login Petugas</Button>
              </Link>
            )}
            <Link to="/register-patient">
              <Button variant="outline" className="border-primary-blue text-primary-blue hover:bg-primary-blue/10">Daftar Pasien</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-primary-blue text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold mb-2">Province Command Center Sumatera Selatan</p>
          <p className="text-sm">Jl. Jenderal Sudirman No.KM. 3,5, Pahlawan, Kec. Kemuning, Kota Palembang, Sumatera Selatan 30128</p>
          <p className="text-sm mt-2">Telepon: 08117870119 | Jam Buka: 24 Jam</p>
          <p className="text-sm text-gray-200 mt-4">Copyright © {currentYear} PCC Sumsel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;