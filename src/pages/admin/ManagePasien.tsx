import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PasienTable from "@/components/Pasien/PasienTable";
import PasienForm from "@/components/Pasien/PasienForm";
import { getPasien, createPasien, updatePasien, deletePasien } from "@/data/crud";
import { Pasien } from "@/types";
import { toast } from "sonner";

const ManagePasien = () => {
  const [pasienList, setPasienList] = useState<Pasien[]>(getPasien());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPasien, setEditingPasien] = useState<Pasien | null>(null);

  const handleAddPasien = (newPasien: Omit<Pasien, "id">) => {
    createPasien(newPasien);
    setPasienList(getPasien());
    setIsFormOpen(false);
    toast.success("Pasien berhasil ditambahkan!");
  };

  const handleEditPasien = (pasien: Pasien) => {
    setEditingPasien(pasien);
    setIsFormOpen(true);
  };

  const handleUpdatePasien = (updatedFields: Omit<Pasien, "id">) => {
    if (editingPasien) {
      updatePasien(editingPasien.id, updatedFields);
      setPasienList(getPasien());
      setIsFormOpen(false);
      setEditingPasien(null);
      toast.success("Pasien berhasil diperbarui!");
    }
  };

  const handleDeletePasien = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data pasien ini?")) {
      deletePasien(id);
      setPasienList(getPasien());
      toast.info("Data pasien berhasil dihapus.");
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPasien(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Kelola Pasien</CardTitle>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary-blue hover:bg-primary-blue/90"
              onClick={() => {
                setEditingPasien(null);
                setIsFormOpen(true);
              }}
            >
              Tambah Pasien Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg md:max-w-2xl"> {/* Adjusted width */}
            <DialogHeader>
              <DialogTitle>{editingPasien ? "Edit Pasien" : "Tambah Pasien Baru"}</DialogTitle>
              <DialogDescription>
                {editingPasien ? "Ubah detail pasien di bawah ini." : "Isi detail pasien baru di bawah ini."}
              </DialogDescription>
            </DialogHeader>
            <PasienForm
              initialData={editingPasien}
              onSubmit={editingPasien ? handleUpdatePasien : handleAddPasien}
              onCancel={handleCloseForm}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <PasienTable
          pasien={pasienList}
          onEdit={handleEditPasien}
          onDelete={handleDeletePasien}
        />
      </CardContent>
    </Card>
  );
};

export default ManagePasien;