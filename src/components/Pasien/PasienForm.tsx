import React, { useState, useEffect } from "react";
import { Pasien, PasienStatusRujuk, Kegiatan } from "@/types";
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
import { Textarea } from "@/components/ui/textarea";
import { getKegiatan } from "@/data/crud";
import { useAuth } from "@/context/AuthContext";

interface PasienFormProps {
  initialData?: Pasien | null;
  onSubmit: (data: Omit<Pasien, "id">) => void;
  onCancel: () => void;
}

const PasienForm = ({ initialData, onSubmit, onCancel }: PasienFormProps) => {
  const { user } = useAuth();
  const [kegiatanId, setKegiatanId] = useState("");
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState<number | string>("");
  const [alamat, setAlamat] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [noID, setNoID] = useState("");
  const [tanggalBerobat, setTanggalBerobat] = useState("");
  const [dataSubjektif, setDataSubjektif] = useState("");
  const [dataPemeriksaanFisik, setDataPemeriksaanFisik] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [therapy, setTherapy] = useState("");
  const [statusRujuk, setStatusRujuk] = useState<PasienStatusRujuk>("Tidak Rujuk");

  const allKegiatan = getKegiatan();
  const availableKegiatan = user?.role === "admin"
    ? allKegiatan
    : allKegiatan.filter(k => k.status === "On Progress");

  useEffect(() => {
    if (initialData) {
      setKegiatanId(initialData.kegiatanId);
      setNama(initialData.nama);
      setUmur(initialData.umur);
      setAlamat(initialData.alamat);
      setNoTelepon(initialData.noTelepon);
      setNoID(initialData.noID);
      setTanggalBerobat(initialData.tanggalBerobat);
      setDataSubjektif(initialData.dataSubjektif);
      setDataPemeriksaanFisik(initialData.dataPemeriksaanFisik);
      setDiagnosis(initialData.diagnosis);
      setTherapy(initialData.therapy);
      setStatusRujuk(initialData.statusRujuk);
    } else {
      setKegiatanId("");
      setNama("");
      setUmur("");
      setAlamat("");
      setNoTelepon("");
      setNoID("");
      setTanggalBerobat("");
      setDataSubjektif("");
      setDataPemeriksaanFisik("");
      setDiagnosis("");
      setTherapy("");
      setStatusRujuk("Tidak Rujuk");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      kegiatanId,
      nama,
      umur: Number(umur),
      alamat,
      noTelepon,
      noID,
      tanggalBerobat,
      dataSubjektif,
      dataPemeriksaanFisik,
      diagnosis,
      therapy,
      statusRujuk,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="kegiatanId" className="md:text-right">
          Kegiatan
        </Label>
        <Select value={kegiatanId} onValueChange={setKegiatanId} required>
          <SelectTrigger className="md:col-span-3">
            <SelectValue placeholder="Pilih Kegiatan" />
          </SelectTrigger>
          <SelectContent>
            {availableKegiatan.map((kegiatan) => (
              <SelectItem key={kegiatan.id} value={kegiatan.id}>
                {kegiatan.namaKegiatan} ({kegiatan.status})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
        <Label htmlFor="umur" className="md:text-right">
          Umur
        </Label>
        <Input
          id="umur"
          type="number"
          value={umur}
          onChange={(e) => setUmur(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="alamat" className="md:text-right">
          Alamat
        </Label>
        <Input
          id="alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="noTelepon" className="md:text-right">
          No. Telepon
        </Label>
        <Input
          id="noTelepon"
          value={noTelepon}
          onChange={(e) => setNoTelepon(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="noID" className="md:text-right">
          No. ID
        </Label>
        <Input
          id="noID"
          value={noID}
          onChange={(e) => setNoID(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="tanggalBerobat" className="md:text-right">
          Tanggal Berobat
        </Label>
        <Input
          id="tanggalBerobat"
          type="date"
          value={tanggalBerobat}
          onChange={(e) => setTanggalBerobat(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4 md:col-span-2"> {/* Full width for textarea */}
        <Label htmlFor="dataSubjektif" className="md:text-right">
          Data Subjektif
        </Label>
        <Textarea
          id="dataSubjektif"
          value={dataSubjektif}
          onChange={(e) => setDataSubjektif(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4 md:col-span-2"> {/* Full width for textarea */}
        <Label htmlFor="dataPemeriksaanFisik" className="md:text-right">
          Data Pemeriksaan Fisik
        </Label>
        <Textarea
          id="dataPemeriksaanFisik"
          value={dataPemeriksaanFisik}
          onChange={(e) => setDataPemeriksaanFisik(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4 md:col-span-2"> {/* Full width for textarea */}
        <Label htmlFor="diagnosis" className="md:text-right">
          Diagnosis
        </Label>
        <Textarea
          id="diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4 md:col-span-2"> {/* Full width for textarea */}
        <Label htmlFor="therapy" className="md:text-right">
          Terapi
        </Label>
        <Textarea
          id="therapy"
          value={therapy}
          onChange={(e) => setTherapy(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-4">
        <Label htmlFor="statusRujuk" className="md:text-right">
          Status Rujuk
        </Label>
        <Select value={statusRujuk} onValueChange={(value) => setStatusRujuk(value as PasienStatusRujuk)}>
          <SelectTrigger className="md:col-span-3">
            <SelectValue placeholder="Pilih Status Rujuk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Rujuk">Rujuk</SelectItem>
            <SelectItem value="Tidak Rujuk">Tidak Rujuk</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter className="mt-4 col-span-full flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Button variant="outline" onClick={onCancel} type="button">
          Batal
        </Button>
        <Button type="submit" className="bg-primary-blue hover:bg-primary-blue/90 mb-2 sm:mb-0">
          {initialData ? "Simpan Perubahan" : "Tambah Pasien"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default PasienForm;