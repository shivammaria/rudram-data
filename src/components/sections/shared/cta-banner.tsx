
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import servicesContent from "@/app/content/services.json";
import { HealthCheckModal } from '@/components/modals/health-check-modal';
import { StartJourneyModal } from '@/components/modals/start-journey-modal';

export default function CtaBanner() {
    const { headline, primaryCta, secondaryCta } = servicesContent.ctaBanner;

    return (
        <section className="w-full py-20 lg:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="p-8 lg:p-12 rounded-2xl glass-morphic border-2 border-primary/30 shadow-2xl shadow-primary/20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 text-glow bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300">
                        {headline}
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <HealthCheckModal defaultServiceId="health-check">
                            <Button size="lg" className="btn-glow text-lg px-8 py-6 animate-pulse-glow">
                                {primaryCta.text}
                            </Button>
                        </HealthCheckModal>
                        <StartJourneyModal>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass-morphic border-white/50 hover:border-white text-white hover:bg-white/20 hover:text-black">
                                {secondaryCta.text}
                            </Button>
                        </StartJourneyModal>
                    </div>
                </div>
            </div>
        </section>
    );
}
