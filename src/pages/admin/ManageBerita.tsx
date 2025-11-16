import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BeritaTable from "@/components/Berita/BeritaTable";
import BeritaForm from "@/components/Berita/BeritaForm";
import { getBerita, createBerita, updateBerita, deleteBerita } from "@/data/crud";
import { Berita } from "@/types";
import { toast } from "sonner";

const ManageBerita = () => {
  const [beritaList, setBeritaList] = useState<Berita[]>(getBerita());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState<Berita | null>(null);

  const handleAddBerita = (newBerita: Omit<Berita, "id">) => {
    createBerita(newBerita);
    setBeritaList(getBerita());
    setIsFormOpen(false);
    toast.success("Berita berhasil ditambahkan!");
  };

  const handleEditBerita = (berita: Berita) => {
    setEditingBerita(berita);
    setIsFormOpen(true);
  };

  const handleUpdateBerita = (updatedFields: Omit<Berita, "id">) => {
    if (editingBerita) {
      updateBerita(editingBerita.id, updatedFields);
      setBeritaList(getBerita());
      setIsFormOpen(false);
      setEditingBerita(null);
      toast.success("Berita berhasil diperbarui!");
    }
  };

  const handleDeleteBerita = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      deleteBerita(id);
      setBeritaList(getBerita());
      toast.info("Berita berhasil dihapus.");
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBerita(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Kelola Berita</CardTitle>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary-blue hover:bg-primary-blue/90"
              onClick={() => {
                setEditingBerita(null);
                setIsFormOpen(true);
              }}
            >
              Tambah Berita Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg md:max-w-2xl"> {/* Adjusted width */}
            <DialogHeader>
              <DialogTitle>{editingBerita ? "Edit Berita" : "Tambah Berita Baru"}</DialogTitle>
              <DialogDescription>
                {editingBerita ? "Ubah detail berita di bawah ini." : "Isi detail berita baru di bawah ini."}
              </DialogDescription>
            </DialogHeader>
            <BeritaForm
              initialData={editingBerita}
              onSubmit={editingBerita ? handleUpdateBerita : handleAddBerita}
              onCancel={handleCloseForm}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <BeritaTable
          berita={beritaList}
          onEdit={handleEditBerita}
          onDelete={handleDeleteBerita}
        />
      </CardContent>
    </Card>
  );
};

export default ManageBerita;