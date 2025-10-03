
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import heroContent from "@/app/content/hero.json";
import { HealthCheckModal } from "@/components/modals/health-check-modal";
import { StartJourneyModal } from "@/components/modals/start-journey-modal";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = useRef(
      Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) {
      return
    }
    
    setCurrent(api.selectedScrollSnap());
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const slides = heroContent.slides;
  const currentSlideContent = slides[current % slides.length];

  const SecondaryButton = () => {
    if (currentSlideContent.id === 'clarity') {
      return (
        <Link href="#path">
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass-morphic border-white/50 hover:border-white text-white hover:bg-black/80 hover:text-white">
            {currentSlideContent?.cta.secondary.text || "See How It Works"}
          </Button>
        </Link>
      );
    }

    return (
      <StartJourneyModal>
        <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass-morphic border-white/50 hover:border-white text-white hover:bg-black/80 hover:text-white">
          {currentSlideContent?.cta.secondary.text || "See How It Works"}
        </Button>
      </StartJourneyModal>
    );
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full h-full absolute top-0 left-0"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
            {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
                <div className="w-full h-full relative overflow-hidden">
                <Image
                    src={slide.imageUrl}
                    alt={slide.imageDescription}
                    fill
                    className="object-cover animate-zoom"
                    data-ai-hint={slide.imageHint}
                    priority={index === 0}
                />
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />

        <div className="absolute inset-0 bg-[url('/particles.png')] bg-repeat opacity-10 animate-[pan_20s_linear_infinite]" />

        <div className="container px-4 md:px-6 relative z-20">
            <div className="relative flex flex-col items-center justify-center min-h-[12rem] md:min-h-[16rem]">
                 {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={cn(
                            "absolute inset-0 flex flex-col justify-center items-center space-y-6 transition-opacity duration-1000",
                            current % slides.length === index ? "opacity-100" : "opacity-0"
                        )}
                        aria-hidden={current % slides.length !== index}
                    >
                        <h1
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300"
                        >
                            {slide.headline}
                        </h1>
                        <p
                            className="max-w-3xl mx-auto text-neutral-200 md:text-xl lg:text-2xl opacity-80"
                        >
                            {slide.subheadline}
                        </p>
                    </div>
                ))}
            </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-text-reveal"
            style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}
          >
            <HealthCheckModal defaultServiceId="health-check">
              <Button size="lg" className={cn("btn-glow text-lg py-6", (currentSlideContent?.cta.primary.text || "").length > 25 ? 'px-4' : 'px-6')}>
                {currentSlideContent?.cta.primary.text || "Book a Data Health Check"}
              </Button>
            </HealthCheckModal>
            <SecondaryButton />
          </div>
        </div>
    </section>
  );
}
