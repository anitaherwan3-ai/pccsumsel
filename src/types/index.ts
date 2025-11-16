export type KegiatanStatus = "To Do" | "On Progress" | "Done";
export const KEGIATAN_STATUS_VALUES: KegiatanStatus[] = ["To Do", "On Progress", "Done"];

export interface Kegiatan {
  id: string;
  namaKegiatan: string;
  tanggalMulai: string; // YYYY-MM-DD
  tanggalSelesai: string; // YYYY-MM-DD
  hostKegiatan: string;
  tempatKegiatan: string;
  status: KegiatanStatus;
}

export type PasienStatusRujuk = "Rujuk" | "Tidak Rujuk";
export const PASIEN_STATUS_RUJUK_VALUES: PasienStatusRujuk[] = ["Rujuk", "Tidak Rujuk"];

export interface Pasien {
  id: string;
  kegiatanId: string; // Foreign key to Kegiatan
  nama: string;
  umur: number;
  alamat: string;
  noTelepon: string;
  noID: string;
  tanggalBerobat: string; // YYYY-MM-DD
  dataSubjektif: string;
  dataPemeriksaanFisik: string;
  diagnosis: string;
  therapy: string;
  statusRujuk: PasienStatusRujuk;
}

export type PetugasRole = "admin" | "petugas";
export const PETUGAS_ROLE_VALUES: PetugasRole[] = ["admin", "petugas"];

export interface Petugas {
  id: string;
  idPetugas: string; // Unique ID for login
  idTeamPetugas: string;
  password: string; // In a real app, this would be hashed
  role: PetugasRole;
  nama: string; // Added for display purposes
}

export interface Berita {
  id: string;
  dokumentasiBerita: string; // URL to image/document
  keteranganBerita: string;
  tanggalPublikasi: string; // YYYY-MM-DD
}

export interface AuthUser {
  id: string;
  idPetugas: string;
  role: PetugasRole;
  nama: string;
}