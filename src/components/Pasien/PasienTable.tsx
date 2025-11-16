import React from "react";
import { Pasien, PasienStatusRujuk } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

interface PasienTableProps {
  pasien: Pasien[];
  onEdit: (pasien: Pasien) => void;
  onDelete: (id: string) => void;
}

const PasienTable = ({ pasien, onEdit, onDelete }: PasienTableProps) => {
  const getStatusRujukBadgeColor = (status: PasienStatusRujuk) => {
    switch (status) {
      case "Rujuk":
        return "bg-red-100 text-red-800";
      case "Tidak Rujuk":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Umur</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>No. Telepon</TableHead>
            <TableHead>No. ID</TableHead>
            <TableHead>Tanggal Berobat</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Status Rujuk</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pasien.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                Tidak ada pasien yang terdaftar.
              </TableCell>
            </TableRow>
          ) : (
            pasien.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.nama}</TableCell>
                <TableCell>{item.umur}</TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell>{item.noTelepon}</TableCell>
                <TableCell>{item.noID}</TableCell>
                <TableCell>{item.tanggalBerobat}</TableCell>
                <TableCell>{item.diagnosis}</TableCell>
                <TableCell>
                  <Badge className={getStatusRujukBadgeColor(item.statusRujuk)}>
                    {item.statusRujuk}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="mr-2"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PasienTable;