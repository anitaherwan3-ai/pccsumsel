import React from "react";
import { Petugas, PetugasRole } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

interface PetugasTableProps {
  petugas: Petugas[];
  onEdit: (petugas: Petugas) => void;
  onDelete: (id: string) => void;
}

const PetugasTable = ({ petugas, onEdit, onDelete }: PetugasTableProps) => {
  const getRoleBadgeColor = (role: PetugasRole) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "petugas":
        return "bg-blue-100 text-blue-800";
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
            <TableHead>ID Petugas</TableHead>
            <TableHead>ID Team Petugas</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {petugas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Tidak ada petugas yang terdaftar.
              </TableCell>
            </TableRow>
          ) : (
            petugas.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.nama}</TableCell>
                <TableCell>{item.idPetugas}</TableCell>
                <TableCell>{item.idTeamPetugas}</TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeColor(item.role)}>
                    {item.role}
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

export default PetugasTable;