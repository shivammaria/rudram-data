
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
    <section id="clients" className="w-full py-16 lg:py-24 bg-background/30 border-y border-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12 text-muted-foreground/80 tracking-tight">
          {content.headline}
        </h2>
        
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {content.clients.map((client, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <div className="h-24 md:h-32 w-full flex items-center justify-center bg-white rounded-xl p-6 shadow-sm border border-primary/5 transition-all duration-300 hover:shadow-md hover:border-primary/20">
                    <div className="relative w-full h-full">
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, 25vw"
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
