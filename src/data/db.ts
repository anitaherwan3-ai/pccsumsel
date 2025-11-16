import { Kegiatan, Pasien, Petugas, Berita, KegiatanStatus, PasienStatusRujuk, PetugasRole } from "@/types";

// Helper to generate unique IDs
let nextId = 1;
const generateId = () => `id-${nextId++}`;

export const kegiatanDB: Kegiatan[] = [
  {
    id: generateId(),
    namaKegiatan: "Bakti Sosial Kesehatan Desa Makmur",
    tanggalMulai: "2024-08-01",
    tanggalSelesai: "2024-08-03",
    hostKegiatan: "Dinas Kesehatan Sumsel",
    tempatKegiatan: "Desa Makmur, Kab. A",
    status: "On Progress",
  },
  {
    id: generateId(),
    namaKegiatan: "Penyuluhan Gizi Seimbang Kota Palembang",
    tanggalMulai: "2024-09-10",
    tanggalSelesai: "2024-09-10",
    hostKegiatan: "Puskesmas Palembang",
    tempatKegiatan: "Balai Kota Palembang",
    status: "To Do",
  },
  {
    id: generateId(),
    namaKegiatan: "Vaksinasi Massal COVID-19",
    tanggalMulai: "2024-07-15",
    tanggalSelesai: "2024-07-20",
    hostKegiatan: "Kementerian Kesehatan",
    tempatKegiatan: "Stadion Gelora Sriwijaya",
    status: "Done",
  },
  {
    id: generateId(),
    namaKegiatan: "Donor Darah Rutin",
    tanggalMulai: "2024-06-01",
    tanggalSelesai: "2024-06-01",
    hostKegiatan: "PMI Sumatera Selatan",
    tempatKegiatan: "Kantor Gubernur Sumsel",
    status: "Done",
  },
];

export const petugasDB: Petugas[] = [
  {
    id: generateId(),
    idPetugas: "admin123",
    idTeamPetugas: "ADM001",
    password: "admin", // For simulation, use plain text
    role: "admin",
    nama: "Admin Utama",
  },
  {
    id: generateId(),
    idPetugas: "petugas123",
    idTeamPetugas: "PTG001",
    password: "petugas", // For simulation, use plain text
    role: "petugas",
    nama: "Petugas Lapangan A",
  },
  {
    id: generateId(),
    idPetugas: "petugas456",
    idTeamPetugas: "PTG002",
    password: "petugas",
    role: "petugas",
    nama: "Petugas Lapangan B",
  },
];

export const pasienDB: Pasien[] = [
  {
    id: generateId(),
    kegiatanId: kegiatanDB[0].id, // Linked to "Bakti Sosial Kesehatan Desa Makmur"
    nama: "Budi Santoso",
    umur: 45,
    alamat: "Desa Makmur RT 01 RW 02",
    noTelepon: "081234567890",
    noID: "3210010000000001",
    tanggalBerobat: "2024-08-01",
    dataSubjektif: "Demam, batuk kering, nyeri tenggorokan",
    dataPemeriksaanFisik: "Suhu 38.5C, tenggorokan merah, paru bersih",
    diagnosis: "ISPA",
    therapy: "Paracetamol, antibiotik",
    statusRujuk: "Tidak Rujuk",
  },
  {
    id: generateId(),
    kegiatanId: kegiatanDB[0].id, // Linked to "Bakti Sosial Kesehatan Desa Makmur"
    nama: "Siti Aminah",
    umur: 30,
    alamat: "Desa Makmur RT 03 RW 01",
    noTelepon: "081298765432",
    noID: "3210010000000002",
    tanggalBerobat: "2024-08-02",
    dataSubjektif: "Pusing, lemas, mual",
    dataPemeriksaanFisik: "Tekanan darah rendah, pucat",
    diagnosis: "Anemia",
    therapy: "Suplemen zat besi",
    statusRujuk: "Tidak Rujuk",
  },
];

export const beritaDB: Berita[] = [
  {
    id: generateId(),
    dokumentasiBerita: "/placeholder.svg", // Placeholder image
    keteranganBerita: "Pemerintah Provinsi Sumsel Gelar Bakti Sosial Kesehatan di 10 Desa Terpencil.",
    tanggalPublikasi: "2024-07-25",
  },
  {
    id: generateId(),
    dokumentasiBerita: "/placeholder.svg", // Placeholder image
    keteranganBerita: "Program Telemedicine Gratis Diluncurkan untuk Warga Sumatera Selatan.",
    tanggalPublikasi: "2024-07-20",
  },
  {
    id: generateId(),
    dokumentasiBerita: "/placeholder.svg", // Placeholder image
    keteranganBerita: "Tim Kesehatan Siaga Bencana Banjir di Musi Banyuasin.",
    tanggalPublikasi: "2024-07-18",
  },
];