
"use client";

import * as React from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import content from "@/app/content/clients.json";

export default function ClientsSlider() {
  const plugin = React.useRef(
    AutoScroll({ 
      speed: 0.8, 
      stopOnInteraction: false, 
      stopOnMouseEnter: false 
    })
  );

  return (
    <section id="clients" className="w-full py-16 lg:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-3xl md:text-5xl font-bold mb-16 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          {content.headline}
        </h2>
        
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Professional Fade Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-20 bg-gradient-to-r from-background via-background/60 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-20 bg-gradient-to-l from-background via-background/60 to-transparent pointer-events-none" />
          
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {[...content.clients, ...content.clients].map((client, index) => (
                <CarouselItem key={index} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <div className="p-3">
                    <div className="relative w-full h-24 md:h-28 bg-white rounded-xl shadow-lg border border-white/10 overflow-hidden flex items-center justify-center p-4 hover:scale-105 transition-transform duration-500 group">
                      <div className="relative w-full h-full">
                        <Image
                          src={client.logo}
                          alt={`${client.name} logo`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 50vw, 20vw"
                          priority={index < 8}
                          unoptimized
                        />
                      </div>
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
