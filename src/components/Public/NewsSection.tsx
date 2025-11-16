import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBerita } from "@/data/crud";

const NewsSection = () => {
  const berita = getBerita();

  return (
    <section id="berita" className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary-blue mb-10">Berita Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {berita.map((item) => (
            <Card key={item.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border-primary-blue/20">
              <img
                src={item.dokumentasiBerita}
                alt={item.keteranganBerita}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-6">
                <p className="text-sm text-gray-500 mb-2">{item.tanggalPublikasi}</p>
                <CardTitle className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                  {item.keteranganBerita}
                </CardTitle>
                <a href="#" className="text-primary-blue hover:underline text-sm font-medium">
                  Baca Selengkapnya
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;