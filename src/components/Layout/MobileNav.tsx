"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface MobileNavProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const MobileNav = ({ isAuthenticated, onLogout }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <Link to="/" className="flex items-center space-x-2 mb-6" onClick={closeSheet}>
          <span className="font-bold text-xl text-primary-blue">PCC Sumsel</span>
        </Link>
        <nav className="flex flex-col gap-4 text-lg font-medium">
          <Link to="/" className="hover:text-primary-blue" onClick={closeSheet}>Beranda</Link>
          <Link to="/#layanan" className="hover:text-primary-blue" onClick={closeSheet}>Layanan</Link>
          <Link to="/#kegiatan" className="hover:text-primary-blue" onClick={closeSheet}>Kegiatan</Link>
          <Link to="/#berita" className="hover:text-primary-blue" onClick={closeSheet}>Berita</Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin/dashboard" className="hover:text-primary-blue" onClick={closeSheet}>Dasbor Admin</Link>
              <Button variant="ghost" onClick={() => { onLogout(); closeSheet(); }} className="text-red-500 hover:text-red-700 justify-start px-0">Logout</Button>
            </>
          ) : (
            <Link to="/login" className="hover:text-primary-blue" onClick={closeSheet}>Login Petugas</Link>
          )}
          <Link to="/register-patient" className="hover:text-primary-blue" onClick={closeSheet}>Daftar Pasien</Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;