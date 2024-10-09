import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselDemo() {
  // Example array of image objects with corresponding text and image paths
  const images = [
    { id: 1, text: "Annual data protection audits", src: "/assets/Image3.png" },
    { id: 2, text: "Privacy policy reviews", src: "/assets/Image4.png" },
    { id: 3, text: "Data breach notification deadlines", src: "/assets/Image5.png" },
  ];

  return (
    <div className="flex justify-center bg-purple-900 py-10"> {/* Center the carousel and apply background color */}
      <Carousel className="w-full max-w-3xl"> {/* Adjust the width */}
        <CarouselContent className="flex justify-between"> {/* Ensure 3 images are shown */}
          {images.map((image) => (
            <CarouselItem key={image.id} className="w-1/5 px-2"> {/* Adjust item width */}
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                    {/* Image from assets folder */}
                    <img
                      src={image.src}
                      alt={image.text}
                      className="object-cover w-full h-full"
                    />
                    {/* Text description below the image */}
                    <span className="mt-4 text-center text-xl text-white">
                      {image.text}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
