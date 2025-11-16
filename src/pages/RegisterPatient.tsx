import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PasienForm from "@/components/Pasien/PasienForm";
import { createPasien } from "@/data/crud";
import { Pasien } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

const RegisterPatient = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddPasien = (newPasien: Omit<Pasien, "id">) => {
    createPasien(newPasien);
    toast.success("Pendaftaran pasien berhasil!");
    navigate("/admin/pasien"); // Redirect to manage pasien page after registration
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-100 p-4">
        <Alert variant="destructive" className="max-w-md">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Akses Ditolak</AlertTitle>
          <AlertDescription>
            Anda harus login sebagai petugas atau admin untuk mendaftarkan pasien. Silakan{" "}
            <a href="/login" className="underline font-semibold">Login</a>.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Pendaftaran Pasien Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <PasienForm
            onSubmit={handleAddPasien}
            onCancel={() => navigate("/")} // Redirect to home if cancelled
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPatient;