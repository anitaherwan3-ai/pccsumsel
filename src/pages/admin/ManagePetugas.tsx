import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PetugasTable from "@/components/Petugas/PetugasTable";
import PetugasForm from "@/components/Petugas/PetugasForm";
import { getPetugas, createPetugas, updatePetugas, deletePetugas } from "@/data/crud";
import { Petugas } from "@/types";
import { toast } from "sonner";

const ManagePetugas = () => {
  const [petugasList, setPetugasList] = useState<Petugas[]>(getPetugas());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPetugas, setEditingPetugas] = useState<Petugas | null>(null);

  const handleAddPetugas = (newPetugas: Omit<Petugas, "id">) => {
    createPetugas(newPetugas);
    setPetugasList(getPetugas());
    setIsFormOpen(false);
    toast.success("Petugas berhasil ditambahkan!");
  };

  const handleEditPetugas = (petugas: Petugas) => {
    setEditingPetugas(petugas);
    setIsFormOpen(true);
  };

  const handleUpdatePetugas = (updatedFields: Omit<Petugas, "id">) => {
    if (editingPetugas) {
      updatePetugas(editingPetugas.id, updatedFields);
      setPetugasList(getPetugas());
      setIsFormOpen(false);
      setEditingPetugas(null);
      toast.success("Petugas berhasil diperbarui!");
    }
  };

  const handleDeletePetugas = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data petugas ini?")) {
      deletePetugas(id);
      setPetugasList(getPetugas());
      toast.info("Data petugas berhasil dihapus.");
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPetugas(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Kelola Petugas</CardTitle>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary-blue hover:bg-primary-blue/90"
              onClick={() => {
                setEditingPetugas(null);
                setIsFormOpen(true);
              }}
            >
              Tambah Petugas Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg md:max-w-2xl"> {/* Adjusted width */}
            <DialogHeader>
              <DialogTitle>{editingPetugas ? "Edit Petugas" : "Tambah Petugas Baru"}</DialogTitle>
              <DialogDescription>
                {editingPetugas ? "Ubah detail petugas di bawah ini." : "Isi detail petugas baru di bawah ini."}
              </DialogDescription>
            </DialogHeader>
            <PetugasForm
              initialData={editingPetugas}
              onSubmit={editingPetugas ? handleUpdatePetugas : handleAddPetugas}
              onCancel={handleCloseForm}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <PetugasTable
          petugas={petugasList}
          onEdit={handleEditPetugas}
          onDelete={handleDeletePetugas}
        />
      </CardContent>
    </Card>
  );
};

export default ManagePetugas;