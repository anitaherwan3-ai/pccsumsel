import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import KegiatanTable from "@/components/Kegiatan/KegiatanTable";
import KegiatanForm from "@/components/Kegiatan/KegiatanForm";
import { getKegiatan, createKegiatan, updateKegiatan, deleteKegiatan } from "@/data/crud";
import { Kegiatan } from "@/types";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"; // Import Input component
import { Search } from "lucide-react"; // Import Search icon

const ManageKegiatan = () => {
  const [kegiatanList, setKegiatanList] = useState<Kegiatan[]>(getKegiatan());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingKegiatan, setEditingKegiatan] = useState<Kegiatan | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Filter kegiatan list based on search term
  const filteredKegiatan = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return kegiatanList.filter(
      (kegiatan) =>
        kegiatan.namaKegiatan.toLowerCase().includes(lowerCaseSearchTerm) ||
        kegiatan.hostKegiatan.toLowerCase().includes(lowerCaseSearchTerm) ||
        kegiatan.tempatKegiatan.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [kegiatanList, searchTerm]);

  const handleAddKegiatan = (newKegiatan: Omit<Kegiatan, "id">) => {
    createKegiatan(newKegiatan);
    setKegiatanList(getKegiatan());
    setIsFormOpen(false);
    toast.success("Kegiatan berhasil ditambahkan!");
  };

  const handleEditKegiatan = (kegiatan: Kegiatan) => {
    setEditingKegiatan(kegiatan);
    setIsFormOpen(true);
  };

  const handleUpdateKegiatan = (updatedFields: Omit<Kegiatan, "id">) => {
    if (editingKegiatan) {
      updateKegiatan(editingKegiatan.id, updatedFields);
      setKegiatanList(getKegiatan());
      setIsFormOpen(false);
      setEditingKegiatan(null);
      toast.success("Kegiatan berhasil diperbarui!");
    }
  };

  const handleDeleteKegiatan = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus kegiatan ini? Ini juga akan menghapus pasien terkait.")) {
      deleteKegiatan(id);
      setKegiatanList(getKegiatan());
      toast.info("Kegiatan berhasil dihapus.");
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingKegiatan(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Kelola Kegiatan</CardTitle>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari kegiatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[200px]"
            />
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-primary-blue hover:bg-primary-blue/90"
                onClick={() => {
                  setEditingKegiatan(null);
                  setIsFormOpen(true);
                }}
              >
                Tambah Kegiatan Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg md:max-w-2xl"> {/* Adjusted width */}
              <DialogHeader>
                <DialogTitle>{editingKegiatan ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}</DialogTitle>
                <DialogDescription>
                  {editingKegiatan ? "Ubah detail kegiatan di bawah ini." : "Isi detail kegiatan baru di bawah ini."}
                </DialogDescription>
              </DialogHeader>
              <KegiatanForm
                initialData={editingKegiatan}
                onSubmit={editingKegiatan ? handleUpdateKegiatan : handleAddKegiatan}
                onCancel={handleCloseForm}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <KegiatanTable
          kegiatan={filteredKegiatan} // Pass filtered list to the table
          onEdit={handleEditKegiatan}
          onDelete={handleDeleteKegiatan}
        />
      </CardContent>
    </Card>
  );
};

export default ManageKegiatan;