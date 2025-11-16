import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Stethoscope } from "lucide-react";
import { getKegiatan, getPasien, getPetugas } from "@/data/crud";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import {
  KegiatanStatus,
  PasienStatusRujuk,
  PetugasRole,
  KEGIATAN_STATUS_VALUES,
  PASIEN_STATUS_RUJUK_VALUES,
  PETUGAS_ROLE_VALUES,
} from "@/types";

const DashboardSummary = () => {
  const allKegiatan = getKegiatan();
  const allPasien = getPasien();
  const allPetugas = getPetugas();

  // Data for Kegiatan Status Chart
  const kegiatanStatusData = KEGIATAN_STATUS_VALUES.map(status => ({
    name: status,
    value: allKegiatan.filter(k => k.status === status).length,
  }));

  const KEGIATAN_COLORS = {
    "To Do": "#60A5FA", // Blue
    "On Progress": "#FCD34D", // Yellow
    "Done": "#34D399", // Green
  };

  // Data for Pasien Status Rujuk Chart
  const pasienStatusRujukData = PASIEN_STATUS_RUJUK_VALUES.map(status => ({
    name: status,
    value: allPasien.filter(p => p.statusRujuk === status).length,
  }));

  const PASIEN_COLORS = {
    "Rujuk": "#EF4444", // Red
    "Tidak Rujuk": "#22C55E", // Green
  };

  // Data for Petugas Role Chart
  const petugasRoleData = PETUGAS_ROLE_VALUES.map(role => ({
    name: role === "admin" ? "Admin" : "Petugas",
    value: allPetugas.filter(p => p.role === role).length,
  }));

  const PETUGAS_COLORS = {
    "Admin": "#8B5CF6", // Purple
    "Petugas": "#3B82F6", // Blue
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status Kegiatan</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={kegiatanStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {kegiatanStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={KEGIATAN_COLORS[entry.name as KegiatanStatus]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Distribusi kegiatan berdasarkan status
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status Rujuk Pasien</CardTitle>
          <Stethoscope className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pasienStatusRujukData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pasienStatusRujukData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PASIEN_COLORS[entry.name as PasienStatusRujuk]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Distribusi pasien berdasarkan status rujukan
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Peran Petugas</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={petugasRoleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {petugasRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PETUGAS_COLORS[entry.name as "Admin" | "Petugas"]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Distribusi petugas berdasarkan peran
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;