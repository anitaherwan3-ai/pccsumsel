import React from "react";
import { Kegiatan, KegiatanStatus } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

interface KegiatanTableProps {
  kegiatan: Kegiatan[];
  onEdit: (kegiatan: Kegiatan) => void;
  onDelete: (id: string) => void;
}

const KegiatanTable = ({ kegiatan, onEdit, onDelete }: KegiatanTableProps) => {
  const getStatusBadgeVariant = (status: KegiatanStatus) => {
    switch (status) {
      case "To Do":
        return "secondary";
      case "On Progress":
        return "default"; // Tailwind default bg-gray-200, text-gray-800
      case "Done":
        return "outline"; // Tailwind default border, text-foreground
      default:
        return "secondary";
    }
  };

  const getStatusBadgeColor = (status: KegiatanStatus) => {
    switch (status) {
      case "To Do":
        return "bg-blue-100 text-blue-800";
      case "On Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Done":
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
            <TableHead>Nama Kegiatan</TableHead>
            <TableHead>Tanggal Mulai</TableHead>
            <TableHead>Tanggal Selesai</TableHead>
            <TableHead>Host</TableHead>
            <TableHead>Tempat</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kegiatan.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Tidak ada kegiatan yang terdaftar.
              </TableCell>
            </TableRow>
          ) : (
            kegiatan.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.namaKegiatan}</TableCell>
                <TableCell>{item.tanggalMulai}</TableCell>
                <TableCell>{item.tanggalSelesai}</TableCell>
                <TableCell>{item.hostKegiatan}</TableCell>
                <TableCell>{item.tempatKegiatan}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(item.status)}>
                    {item.status}
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

export default KegiatanTable;