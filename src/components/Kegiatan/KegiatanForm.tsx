import React, { useState, useEffect } from "react";
import { Kegiatan, KegiatanStatus } from "@/types";
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

interface KegiatanFormProps {
  initialData?: Kegiatan | null;
  onSubmit: (data: Omit<Kegiatan, "id">) => void;
  onCancel: () => void;
}

const KegiatanForm = ({ initialData, onSubmit, onCancel }: KegiatanFormProps) => {
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [hostKegiatan, setHostKegiatan] = useState("");
  const [tempatKegiatan, setTempatKegiatan] = useState("");
  const [status, setStatus] = useState<KegiatanStatus>("To Do");

  useEffect(() => {
    if (initialData) {
      setNamaKegiatan(initialData.namaKegiatan);
      setTanggalMulai(initialData.tanggalMulai);
      setTanggalSelesai(initialData.tanggalSelesai);
      setHostKegiatan(initialData.hostKegiatan);
      setTempatKegiatan(initialData.tempatKegiatan);
      setStatus(initialData.status);
    } else {
      setNamaKegiatan("");
      setTanggalMulai("");
      setTanggalSelesai("");
      setHostKegiatan("");
      setTempatKegiatan("");
      setStatus("To Do");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      namaKegiatan,
      tanggalMulai,
      tanggalSelesai,
      hostKegiatan,
      tempatKegiatan,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="namaKegiatan" className="md:text-right">
          Nama Kegiatan
        </Label>
        <Input
          id="namaKegiatan"
          value={namaKegiatan}
          onChange={(e) => setNamaKegiatan(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="tanggalMulai" className="md:text-right">
          Tanggal Mulai
        </Label>
        <Input
          id="tanggalMulai"
          type="date"
          value={tanggalMulai}
          onChange={(e) => setTanggalMulai(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="tanggalSelesai" className="md:text-right">
          Tanggal Selesai
        </Label>
        <Input
          id="tanggalSelesai"
          type="date"
          value={tanggalSelesai}
          onChange={(e) => setTanggalSelesai(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="hostKegiatan" className="md:text-right">
          Host Kegiatan
        </Label>
        <Input
          id="hostKegiatan"
          value={hostKegiatan}
          onChange={(e) => setHostKegiatan(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="tempatKegiatan" className="md:text-right">
          Tempat Kegiatan
        </Label>
        <Input
          id="tempatKegiatan"
          value={tempatKegiatan}
          onChange={(e) => setTempatKegiatan(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="status" className="md:text-right">
          Status
        </Label>
        <Select value={status} onValueChange={(value) => setStatus(value as KegiatanStatus)}>
          <SelectTrigger className="md:col-span-3">
            <SelectValue placeholder="Pilih Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="On Progress">On Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter className="mt-4 col-span-full flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Button variant="outline" onClick={onCancel} type="button">
          Batal
        </Button>
        <Button type="submit" className="bg-primary-blue hover:bg-primary-blue/90 mb-2 sm:mb-0">
          {initialData ? "Simpan Perubahan" : "Tambah Kegiatan"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default KegiatanForm;