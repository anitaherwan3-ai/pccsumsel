import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getKegiatan, getPasien } from "@/data/crud";
import { Kegiatan, Pasien } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Printer, CalendarIcon, Search, XCircle } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ManageRekamMedik = () => {
  const allKegiatan = getKegiatan();
  const allPasien = getPasien();

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedKegiatanId, setSelectedKegiatanId] = useState<string>("all"); // Default to "all"
  const [pasienSearchTerm, setPasienSearchTerm] = useState<string>("");

  const filteredPasien = useMemo(() => {
    let currentPasienList = [...allPasien];

    // Filter by activity
    if (selectedKegiatanId !== "all") { // Check if it's not "all"
      currentPasienList = currentPasienList.filter(
        (pasien) => pasien.kegiatanId === selectedKegiatanId
      );
    }

    // Filter by patient name
    if (pasienSearchTerm) {
      const lowerCaseSearchTerm = pasienSearchTerm.toLowerCase();
      currentPasienList = currentPasienList.filter((pasien) =>
        pasien.nama.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Filter by date range (tanggalBerobat)
    if (startDate && endDate) {
      currentPasienList = currentPasienList.filter((pasien) => {
        const patientDate = new Date(pasien.tanggalBerobat);
        const startOfDay = new Date(startDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);

        return patientDate >= startOfDay && patientDate <= endOfDay;
      });
    } else if (startDate) {
      currentPasienList = currentPasienList.filter((pasien) => {
        const patientDate = new Date(pasien.tanggalBerobat);
        const startOfDay = new Date(startDate);
        startOfDay.setHours(0, 0, 0, 0);
        return patientDate >= startOfDay;
      });
    } else if (endDate) {
      currentPasienList = currentPasienList.filter((pasien) => {
        const patientDate = new Date(pasien.tanggalBerobat);
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        return patientDate <= endOfDay;
      });
    }

    return currentPasienList;
  }, [allPasien, startDate, endDate, selectedKegiatanId, pasienSearchTerm]);

  // Group filtered patients by activity for display
  const groupedFilteredPasien = useMemo(() => {
    const groups: { [kegiatanId: string]: Pasien[] } = {};
    filteredPasien.forEach(pasien => {
      if (!groups[pasien.kegiatanId]) {
        groups[pasien.kegiatanId] = [];
      }
      groups[pasien.kegiatanId].push(pasien);
    });
    return groups;
  }, [filteredPasien]);

  const handlePrintPatientDetail = (pasien: Pasien) => {
    const printContent = `
      <html>
        <head>
          <title>Detail Rekam Medik Pasien: ${pasien.nama}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            h1 { color: #2cb1c1; }
            .detail-item { margin-bottom: 10px; }
            .detail-item strong { display: inline-block; width: 150px; }
          </style>
        </head>
        <body>
          <h1>Detail Rekam Medik Pasien</h1>
          <div class="detail-item"><strong>Nama:</strong> ${pasien.nama}</div>
          <div class="detail-item"><strong>Umur:</strong> ${pasien.umur}</div>
          <div class="detail-item"><strong>Alamat:</strong> ${pasien.alamat}</div>
          <div class="detail-item"><strong>No. Telepon:</strong> ${pasien.noTelepon}</div>
          <div class="detail-item"><strong>No. ID:</strong> ${pasien.noID}</div>
          <div class="detail-item"><strong>Tanggal Berobat:</strong> ${pasien.tanggalBerobat}</div>
          <div class="detail-item"><strong>Data Subjektif:</strong> ${pasien.dataSubjektif}</div>
          <div class="detail-item"><strong>Data Pemeriksaan Fisik:</strong> ${pasien.dataPemeriksaanFisik}</div>
          <div class="detail-item"><strong>Diagnosis:</strong> ${pasien.diagnosis}</div>
          <div class="detail-item"><strong>Terapi:</strong> ${pasien.therapy}</div>
          <div class="detail-item"><strong>Status Rujuk:</strong> ${pasien.statusRujuk}</div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handlePrintAllFilteredPatients = () => {
    let printContent = `
      <html>
        <head>
          <title>Rekam Medik Pasien (Hasil Filter)</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            h1 { color: #2cb1c1; margin-bottom: 20px; }
            h2 { color: #333; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            h3 { color: #555; margin-top: 20px; }
            .detail-item { margin-bottom: 5px; font-size: 0.9em; }
            .detail-item strong { display: inline-block; width: 120px; }
            .patient-card { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h1>Rekam Medik Pasien (Hasil Filter)</h1>
    `;

    if (Object.keys(groupedFilteredPasien).length === 0) {
      printContent += "<p>Tidak ada pasien yang cocok dengan filter yang dipilih.</p>";
    } else {
      Object.keys(groupedFilteredPasien).forEach(kegiatanId => {
        const kegiatan = allKegiatan.find(k => k.id === kegiatanId);
        if (kegiatan) {
          printContent += `<h2>Kegiatan: ${kegiatan.namaKegiatan} (${kegiatan.tanggalMulai} - ${kegiatan.tanggalSelesai})</h2>`;
          groupedFilteredPasien[kegiatanId].forEach(pasien => {
            printContent += `
              <div class="patient-card">
                <h3>Pasien: ${pasien.nama}</h3>
                <div class="detail-item"><strong>Umur:</strong> ${pasien.umur}</div>
                <div class="detail-item"><strong>Alamat:</strong> ${pasien.alamat}</div>
                <div class="detail-item"><strong>No. Telepon:</strong> ${pasien.noTelepon}</div>
                <div class="detail-item"><strong>No. ID:</strong> ${pasien.noID}</div>
                <div class="detail-item"><strong>Tanggal Berobat:</strong> ${pasien.tanggalBerobat}</div>
                <div class="detail-item"><strong>Data Subjektif:</strong> ${pasien.dataSubjektif}</div>
                <div class="detail-item"><strong>Data Pemeriksaan Fisik:</strong> ${pasien.dataPemeriksaanFisik}</div>
                <div class="detail-item"><strong>Diagnosis:</strong> ${pasien.diagnosis}</div>
                <div class="detail-item"><strong>Terapi:</strong> ${pasien.therapy}</div>
                <div class="detail-item"><strong>Status Rujuk:</strong> ${pasien.statusRujuk}</div>
              </div>
            `;
          });
        }
      });
    }
    printContent += `</body></html>`;

    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleClearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedKegiatanId("all"); // Reset to "all"
    setPasienSearchTerm("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kelola Rekam Medik</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Filter Tanggal Mulai */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="startDate" className="text-sm font-medium">Tanggal Mulai Berobat</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pilih tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Filter Tanggal Selesai */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="endDate" className="text-sm font-medium">Tanggal Selesai Berobat</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pilih tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Filter Kegiatan */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="kegiatanFilter" className="text-sm font-medium">Filter Kegiatan</label>
            <Select value={selectedKegiatanId} onValueChange={setSelectedKegiatanId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Semua Kegiatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kegiatan</SelectItem> {/* Changed value from "" to "all" */}
                {allKegiatan.map((kegiatan) => (
                  <SelectItem key={kegiatan.id} value={kegiatan.id}>
                    {kegiatan.namaKegiatan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Nama Pasien */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="pasienSearch" className="text-sm font-medium">Cari Nama Pasien</label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="pasienSearch"
                placeholder="Cari nama pasien..."
                value={pasienSearchTerm}
                onChange={(e) => setPasienSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6 space-x-2">
          {(startDate || endDate || selectedKegiatanId !== "all" || pasienSearchTerm) && (
            <Button variant="outline" onClick={handleClearFilters}>
              <XCircle className="h-4 w-4 mr-2" /> Hapus Filter
            </Button>
          )}
          <Button
            className="bg-primary-blue text-white hover:bg-primary-blue/90"
            onClick={handlePrintAllFilteredPatients}
            disabled={filteredPasien.length === 0}
          >
            <Printer className="h-4 w-4 mr-2" /> Cetak Semua Hasil Filter
          </Button>
        </div>

        {Object.keys(groupedFilteredPasien).length === 0 ? (
          <p className="text-center text-gray-600">Tidak ada rekam medik yang cocok dengan filter yang dipilih.</p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {allKegiatan
              .filter(kegiatan => groupedFilteredPasien[kegiatan.id] && groupedFilteredPasien[kegiatan.id].length > 0)
              .map((kegiatan) => (
                <AccordionItem key={kegiatan.id} value={kegiatan.id}>
                  <AccordionTrigger className="text-lg font-semibold text-primary-blue hover:no-underline">
                    {kegiatan.namaKegiatan} ({kegiatan.tanggalMulai} - {kegiatan.tanggalSelesai})
                  </AccordionTrigger>
                  <AccordionContent className="p-4 border-t bg-gray-50">
                    <h4 className="text-md font-bold mb-4">Daftar Pasien:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {groupedFilteredPasien[kegiatan.id].map((pasien) => (
                        <Card key={pasien.id} className="shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{pasien.nama}</CardTitle>
                            <p className="text-sm text-gray-500">Umur: {pasien.umur}</p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">Diagnosis: {pasien.diagnosis}</p>
                            <p className="text-sm">Status Rujuk: {pasien.statusRujuk}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-4 w-full bg-primary-blue text-white hover:bg-primary-blue/90 hover:text-white"
                              onClick={() => handlePrintPatientDetail(pasien)}
                            >
                              <Printer className="h-4 w-4 mr-2" /> Cetak Detail
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default ManageRekamMedik;