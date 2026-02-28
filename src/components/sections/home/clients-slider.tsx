
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
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-12 text-foreground tracking-tight text-glow">
          {content.headline}
        </h2>
        
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Professional Blur/Fade Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-r from-background via-background/60 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-l from-background via-background/60 to-transparent pointer-events-none" />
          
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
                  <div className="p-2">
                    <div className="relative w-full h-32 md:h-36 bg-white rounded-2xl shadow-md border border-primary/5 overflow-hidden flex items-center justify-center p-6 hover:shadow-primary/10 hover:border-primary/20 transition-all duration-300 group">
                      <div className="relative w-full h-full">
                        <Image
                          src={client.logo}
                          alt={`${client.name} logo`}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 20vw"
                          priority={index < 6}
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
