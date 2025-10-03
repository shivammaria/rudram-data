
"use client";

import { ShieldCheck, Lock } from "lucide-react";
import privacyContent from "@/app/content/privacy.json";

export default function PrivacyHero() {
  const { hero } = privacyContent;

  return (
    <section className="relative w-full py-32 lg:py-48 text-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
         <div className="absolute inset-0 bg-[url('/particles.png')] bg-repeat opacity-10 animate-[pan_20s_linear_infinite]" />
         <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]" />
         <ShieldCheck className="absolute top-1/4 left-1/4 h-32 w-32 text-primary/10 animate-float" style={{ animationDelay: '1s'}} />
         <Lock className="absolute bottom-1/4 right-1/4 h-32 w-32 text-accent/10 animate-float" />
      </div>

      <div className="container px-4 md:px-6 relative z-20">
        <div className="space-y-6">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 animate-text-reveal"
            style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
          >
            {hero.headline}
          </h1>
          <p
            className="max-w-3xl mx-auto text-neutral-200 md:text-xl lg:text-2xl opacity-80 animate-text-reveal"
            style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
          >
            {hero.subheadline}
          </p>
        </div>
      </div>
    </section>
  );
}
