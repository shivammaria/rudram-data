
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import content from "@/app/content/case-stories.json";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { HealthCheckModal } from "@/components/modals/health-check-modal";
import { StartJourneyModal } from "@/components/modals/start-journey-modal";

export default function TestimonialCarousel() {
    const { testimonials, cta } = content;
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <section id="testimonials" className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="w-full max-w-4xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="glass-morphic border-primary/20">
                    <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                       <div className="flex-shrink-0 text-center">
                          <Image
                            src={testimonial.photo}
                            alt={testimonial.name}
                            width={100}
                            height={100}
                            className="rounded-full mx-auto border-4 border-primary/50 shadow-lg"
                          />
                          <h4 className="mt-4 text-lg font-bold text-foreground">{testimonial.name}</h4>
                          <p className="text-sm text-primary">{testimonial.role}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                       </div>
                       <div className="relative text-center md:text-left">
                          <MessageSquare className="absolute -top-4 -left-4 h-12 w-12 text-primary/10 -z-10"/>
                          <p className="text-lg text-muted-foreground font-light leading-snug">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>
                       </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="glass-morphic border-primary/50 hover:bg-primary/20" />
          <CarouselNext className="glass-morphic border-primary/50 hover:bg-primary/20" />
        </Carousel>
        
        <div className="mt-20 text-center p-8 rounded-2xl glass-morphic border-2 border-primary/30 shadow-2xl shadow-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 text-glow bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300">
                {cta.headline}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <HealthCheckModal defaultServiceId="health-check">
                    <Button size="lg" className="btn-glow text-lg px-8 py-6 animate-pulse-glow">
                        {cta.primaryCta.text}
                    </Button>
                </HealthCheckModal>
                <StartJourneyModal>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass-morphic border-white/50 hover:border-white text-white hover:bg-white/20 hover:text-black">
                        {cta.secondaryCta.text}
                    </Button>
                </StartJourneyModal>
            </div>
        </div>

      </div>
    </section>
  );
}
