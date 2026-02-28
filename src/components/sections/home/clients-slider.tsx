
"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import content from "@/app/content/clients.json";

export default function ClientsSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  return (
    <section id="clients" className="w-full py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-3xl md:text-5xl font-bold mb-20 text-foreground tracking-tight text-glow">
          {content.headline}
        </h2>
        
        {/* Wrapper for the blur/mask effect */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Blur Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none hidden sm:block" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none hidden sm:block" />
          
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
              duration: 40, // Smoother transition
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {content.clients.map((client, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-8 basis-1/2">
                  <div className="p-2 md:p-4">
                    <div className="relative w-full h-48 md:h-64 bg-white rounded-3xl shadow-2xl border-2 border-primary/10 overflow-hidden flex items-center justify-center p-10 hover:shadow-primary/20 hover:border-primary/40 transition-all duration-500 group">
                      <div className="relative w-full h-full">
                        <Image
                          src={client.logo}
                          alt={`${client.name} logo`}
                          fill
                          className="object-contain transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, 30vw"
                          priority={index < 4}
                          unoptimized
                        />
                      </div>
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
