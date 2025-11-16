import React from "react";
import { Berita } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface BeritaTableProps {
  berita: Berita[];
  onEdit: (berita: Berita) => void;
  onDelete: (id: string) => void;
}

const BeritaTable = ({ berita, onEdit, onDelete }: BeritaTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dokumentasi</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead>Tanggal Publikasi</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {berita.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Tidak ada berita yang terdaftar.
              </TableCell>
            </TableRow>
          ) : (
            berita.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img src={item.dokumentasiBerita} alt="Dokumentasi" className="w-16 h-16 object-cover rounded" />
                </TableCell>
                <TableCell className="font-medium max-w-xs truncate">{item.keteranganBerita}</TableCell>
                <TableCell>{item.tanggalPublikasi}</TableCell>
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

export default BeritaTable;