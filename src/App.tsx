import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import DashboardSummary from "./pages/admin/DashboardSummary";
import ManageKegiatan from "./pages/admin/ManageKegiatan";
import ManagePasien from "./pages/admin/ManagePasien";
import ManagePetugas from "./pages/admin/ManagePetugas";
import ManageBerita from "./pages/admin/ManageBerita";
import ManageRekamMedik from "./pages/admin/ManageRekamMedik";
import PublicLayout from "./layouts/PublicLayout";
import RegisterPatient from "./pages/RegisterPatient"; // Import the new page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/register-patient" element={<PublicLayout><RegisterPatient /></PublicLayout>} /> {/* New route */}

            {/* Admin Routes (Protected) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardSummary />} />
              <Route path="kegiatan" element={<ManageKegiatan />} />
              <Route path="pasien" element={<ManagePasien />} />
              <Route path="petugas" element={<ManagePetugas />} />
              <Route path="berita" element={<ManageBerita />} />
              <Route path="rekam-medik" element={<ManageRekamMedik />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;