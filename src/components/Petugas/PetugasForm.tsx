import React, { useState, useEffect } from "react";
import { Petugas, PetugasRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";

interface PetugasFormProps {
  initialData?: Petugas | null;
  onSubmit: (data: Omit<Petugas, "id">) => void;
  onCancel: () => void;
}

const PetugasForm = ({ initialData, onSubmit, onCancel }: PetugasFormProps) => {
  const [nama, setNama] = useState("");
  const [idPetugas, setIdPetugas] = useState("");
  const [idTeamPetugas, setIdTeamPetugas] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<PetugasRole>("petugas");

  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama);
      setIdPetugas(initialData.idPetugas);
      setIdTeamPetugas(initialData.idTeamPetugas);
      setPassword(initialData.password); // In a real app, this would not be pre-filled
      setRole(initialData.role);
    } else {
      setNama("");
      setIdPetugas("");
      setIdTeamPetugas("");
      setPassword("");
      setRole("petugas");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      nama,
      idPetugas,
      idTeamPetugas,
      password,
      role,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="nama" className="md:text-right">
          Nama
        </Label>
        <Input
          id="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="idPetugas" className="md:text-right">
          ID Petugas
        </Label>
        <Input
          id="idPetugas"
          value={idPetugas}
          onChange={(e) => setIdPetugas(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="idTeamPetugas" className="md:text-right">
          ID Team Petugas
        </Label>
        <Input
          id="idTeamPetugas"
          value={idTeamPetugas}
          onChange={(e) => setIdTeamPetugas(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="password" className="md:text-right">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="role" className="md:text-right">
          Role
        </Label>
        <Select value={role} onValueChange={(value) => setRole(value as PetugasRole)}>
          <SelectTrigger className="md:col-span-3">
            <SelectValue placeholder="Pilih Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="petugas">Petugas</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter className="mt-4 col-span-full flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Button variant="outline" onClick={onCancel} type="button">
          Batal
        </Button>
        <Button type="submit" className="bg-primary-blue hover:bg-primary-blue/90 mb-2 sm:mb-0">
          {initialData ? "Simpan Perubahan" : "Tambah Petugas"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default PetugasForm;