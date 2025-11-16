import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getKegiatan } from "@/data/crud";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ActivitiesSection = () => {
  // Get the 2 latest activities, sorted by date
  const latestActivities = getKegiatan()
    .sort((a, b) => new Date(b.tanggalMulai).getTime() - new Date(a.tanggalMulai).getTime())
    .slice(0, 2);

  return (
    <section id="kegiatan" className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary-blue mb-10">Kegiatan Terbaru</h2>
        {latestActivities.length > 0 ? (
          <Carousel className="w-full max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4">
            <CarouselContent>
              {latestActivities.map((activity, index) => (
                <CarouselItem key={activity.id}>
                  <Card className="shadow-lg rounded-lg border-primary-blue/20 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-6 pb-0">
                      <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 text-left">
                        {activity.namaKegiatan}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 text-left">
                      <p className="text-gray-600 mb-2 text-sm sm:text-base">
                        <span className="font-semibold">Tanggal:</span> {activity.tanggalMulai} - {activity.tanggalSelesai}
                      </p>
                      <p className="text-gray-600 mb-2 text-sm sm:text-base">
                        <span className="font-semibold">Host:</span> {activity.hostKegiatan}
                      </p>
                      <p className="text-gray-600 mb-4 text-sm sm:text-base">
                        <span className="font-semibold">Tempat:</span> {activity.tempatKegiatan}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          activity.status === "On Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : activity.status === "Done"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        ) : (
          <p className="text-gray-600">Belum ada kegiatan terbaru.</p>
        )}
      </div>
    </section>
  );
};

export default ActivitiesSection;