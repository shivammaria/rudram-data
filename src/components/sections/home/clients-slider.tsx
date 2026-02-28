
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
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <section id="clients" className="w-full py-20 lg:py-28 bg-background border-y border-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-muted-foreground/90 tracking-tight text-glow">
          {content.headline}
        </h2>
        
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {content.clients.map((client, index) => (
              <CarouselItem key={index} className="pl-4 md:pl-8 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                <div className="p-2">
                  <div className="group relative h-40 md:h-48 w-full flex items-center justify-center bg-white rounded-2xl p-4 shadow-xl border border-primary/10 transition-all duration-500 hover:scale-105 hover:shadow-primary/20">
                    <div className="relative w-full h-full">
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 20vw"
                      />
                    </div>
                    {/* Subtle overlay to ensure visibility on very light logos */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
