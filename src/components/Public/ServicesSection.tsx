import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Phone, Users } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: HeartPulse,
      title: "Layanan Gawat Darurat Kesehatan",
      description: "Respons cepat untuk kondisi darurat medis 24/7.",
    },
    {
      icon: Phone,
      title: "Layanan TeleMedicine",
      description: "Konsultasi medis online dengan dokter profesional dari mana saja.",
    },
    {
      icon: Users,
      title: "Layanan Tim Kesehatan",
      description: "Dukungan tim medis untuk acara atau kegiatan khusus.",
    },
  ];

  return (
    <section id="layanan" className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary-blue mb-10">Layanan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {services.map((service, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border-primary-blue/20">
              <CardHeader className="flex flex-col items-center justify-center p-6">
                <service.icon className="h-12 w-12 text-primary-blue mb-4" />
                <CardTitle className="text-xl font-semibold text-gray-800">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;