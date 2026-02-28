
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
    <section id="clients" className="w-full py-16 lg:py-24 bg-background border-y border-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-12 text-foreground tracking-tight text-glow">
          {content.headline}
        </h2>
        
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-7xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {content.clients.map((client, index) => (
              <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                <div className="p-2">
                  <div className="relative w-full aspect-[16/10] bg-white rounded-xl shadow-md border border-primary/10 overflow-hidden flex items-center justify-center p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
                    <div className="relative w-full h-full">
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 20vw"
                        priority={index < 5}
                        unoptimized={false}
                      />
                    </div>
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
