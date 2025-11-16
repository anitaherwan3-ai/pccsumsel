import React, { useState, useEffect } from "react";
import { Berita } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface BeritaFormProps {
  initialData?: Berita | null;
  onSubmit: (data: Omit<Berita, "id">) => void;
  onCancel: () => void;
}

const BeritaForm = ({ initialData, onSubmit, onCancel }: BeritaFormProps) => {
  const [dokumentasiBerita, setDokumentasiBerita] = useState("");
  const [keteranganBerita, setKeteranganBerita] = useState("");
  const [tanggalPublikasi, setTanggalPublikasi] = useState("");

  useEffect(() => {
    if (initialData) {
      setDokumentasiBerita(initialData.dokumentasiBerita);
      setKeteranganBerita(initialData.keteranganBerita);
      setTanggalPublikasi(initialData.tanggalPublikasi);
    } else {
      setDokumentasiBerita("");
      setKeteranganBerita("");
      setTanggalPublikasi("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      dokumentasiBerita,
      keteranganBerita,
      tanggalPublikasi,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="dokumentasiBerita" className="md:text-right">
          URL Dokumentasi
        </Label>
        <Input
          id="dokumentasiBerita"
          value={dokumentasiBerita}
          onChange={(e) => setDokumentasiBerita(e.target.value)}
          className="md:col-span-3"
          placeholder="/placeholder.svg"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="tanggalPublikasi" className="md:text-right">
          Tanggal Publikasi
        </Label>
        <Input
          id="tanggalPublikasi"
          type="date"
          value={tanggalPublikasi}
          onChange={(e) => setTanggalPublikasi(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4 md:col-span-2"> {/* Full width for textarea */}
        <Label htmlFor="keteranganBerita" className="md:text-right">
          Keterangan
        </Label>
        <Textarea
          id="keteranganBerita"
          value={keteranganBerita}
          onChange={(e) => setKeteranganBerita(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <DialogFooter className="mt-4 col-span-full flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Button variant="outline" onClick={onCancel} type="button">
          Batal
        </Button>
        <Button type="submit" className="bg-primary-blue hover:bg-primary-blue/90 mb-2 sm:mb-0">
          {initialData ? "Simpan Perubahan" : "Tambah Berita"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default BeritaForm;