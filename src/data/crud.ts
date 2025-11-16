import { kegiatanDB, pasienDB, petugasDB, beritaDB } from "./db";
import { Kegiatan, Pasien, Petugas, Berita, KegiatanStatus } from "@/types";

// Helper to generate unique IDs
let nextId = 100; // Start from a higher number to avoid conflicts with initial data
const generateId = () => `id-${nextId++}`;

// --- Kegiatan CRUD ---
export const getKegiatan = (): Kegiatan[] => [...kegiatanDB];
export const getKegiatanById = (id: string): Kegiatan | undefined =>
  kegiatanDB.find((k) => k.id === id);
export const createKegiatan = (newKegiatan: Omit<Kegiatan, "id">): Kegiatan => {
  const kegiatan = { id: generateId(), ...newKegiatan };
  kegiatanDB.push(kegiatan);
  return kegiatan;
};
export const updateKegiatan = (
  id: string,
  updatedFields: Partial<Kegiatan>,
): Kegiatan | undefined => {
  const index = kegiatanDB.findIndex((k) => k.id === id);
  if (index !== -1) {
    kegiatanDB[index] = { ...kegiatanDB[index], ...updatedFields };
    return kegiatanDB[index];
  }
  return undefined;
};
export const deleteKegiatan = (id: string): boolean => {
  const initialLength = kegiatanDB.length;
  const newKegiatanDB = kegiatanDB.filter((k) => k.id !== id);
  // Also delete associated patients
  const newPasienDB = pasienDB.filter((p) => p.kegiatanId !== id);
  pasienDB.splice(0, pasienDB.length, ...newPasienDB); // Update in-memory array
  kegiatanDB.splice(0, kegiatanDB.length, ...newKegiatanDB); // Update in-memory array
  return kegiatanDB.length < initialLength;
};

// --- Pasien CRUD ---
export const getPasien = (): Pasien[] => [...pasienDB];
export const getPasienById = (id: string): Pasien | undefined =>
  pasienDB.find((p) => p.id === id);
export const createPasien = (newPasien: Omit<Pasien, "id">): Pasien => {
  const pasien = { id: generateId(), ...newPasien };
  pasienDB.push(pasien);
  return pasien;
};
export const updatePasien = (
  id: string,
  updatedFields: Partial<Pasien>,
): Pasien | undefined => {
  const index = pasienDB.findIndex((p) => p.id === id);
  if (index !== -1) {
    pasienDB[index] = { ...pasienDB[index], ...updatedFields };
    return pasienDB[index];
  }
  return undefined;
};
export const deletePasien = (id: string): boolean => {
  const initialLength = pasienDB.length;
  const newPasienDB = pasienDB.filter((p) => p.id !== id);
  pasienDB.splice(0, pasienDB.length, ...newPasienDB); // Update in-memory array
  return pasienDB.length < initialLength;
};

// --- Petugas CRUD ---
export const getPetugas = (): Petugas[] => [...petugasDB];
export const getPetugasById = (id: string): Petugas | undefined =>
  petugasDB.find((p) => p.id === id);
export const getPetugasByLoginId = (idPetugas: string): Petugas | undefined =>
  petugasDB.find((p) => p.idPetugas === idPetugas);
export const createPetugas = (newPetugas: Omit<Petugas, "id">): Petugas => {
  const petugas = { id: generateId(), ...newPetugas };
  petugasDB.push(petugas);
  return petugas;
};
export const updatePetugas = (
  id: string,
  updatedFields: Partial<Petugas>,
): Petugas | undefined => {
  const index = petugasDB.findIndex((p) => p.id === id);
  if (index !== -1) {
    petugasDB[index] = { ...petugasDB[index], ...updatedFields };
    return petugasDB[index];
  }
  return undefined;
};
export const deletePetugas = (id: string): boolean => {
  const initialLength = petugasDB.length;
  const newPetugasDB = petugasDB.filter((p) => p.id !== id);
  petugasDB.splice(0, petugasDB.length, ...newPetugasDB); // Update in-memory array
  return petugasDB.length < initialLength;
};

// --- Berita CRUD ---
export const getBerita = (): Berita[] => [...beritaDB];
export const getBeritaById = (id: string): Berita | undefined =>
  beritaDB.find((b) => b.id === id);
export const createBerita = (newBerita: Omit<Berita, "id">): Berita => {
  const berita = { id: generateId(), ...newBerita };
  beritaDB.push(berita);
  return berita;
};
export const updateBerita = (
  id: string,
  updatedFields: Partial<Berita>,
): Berita | undefined => {
  const index = beritaDB.findIndex((b) => b.id === id);
  if (index !== -1) {
    beritaDB[index] = { ...beritaDB[index], ...updatedFields };
    return beritaDB[index];
  }
  return undefined;
};
export const deleteBerita = (id: string): boolean => {
  const initialLength = beritaDB.length;
  const newBeritaDB = beritaDB.filter((b) => b.id !== id);
  beritaDB.splice(0, beritaDB.length, ...newBeritaDB); // Update in-memory array
  return beritaDB.length < initialLength;
};