import ServicesSection from "@/components/Public/ServicesSection";
import NewsSection from "@/components/Public/NewsSection";
import ActivitiesSection from "@/components/Public/ActivitiesSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[60vh] bg-gradient-to-r from-primary-blue to-blue-400 flex items-center justify-center text-white p-4">
        <div className="text-center z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Province Command Center <br /> Sumatera Selatan
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Pusat Komando Terpadu untuk Pelayanan Kesehatan dan Manajemen Bencana di Sumatera Selatan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {!isAuthenticated && (
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto bg-white text-primary-blue hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300">
                  Login Petugas
                </Button>
              </Link>
            )}
            <Link to="/register-patient">
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary-blue hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300">
                Daftar Pasien
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Activities Section */}
      <ActivitiesSection />

      {/* News Section */}
      <NewsSection />

    </div>
  );
};

export default Index;