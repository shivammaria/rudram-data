
"use client";

import { useEffect, useState } from 'react';
import content from "@/app/content/case-stories.json";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    let startTime: number | null = null;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const newCount = Math.floor(progress * end);
      setCount(newCount);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isMounted]);

  if (!isMounted) {
    return <span>{end}</span>;
  }

  return <span>{count}</span>;
}

export default function CaseStudiesHero() {
  const { pageTitle, pageDescription, stats } = content;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full py-20 text-center overflow-hidden md:py-28 lg:py-32">
      <div className="absolute inset-0 w-full h-full z-0">
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
         <div className="absolute inset-0 bg-[url('/particles.png')] bg-repeat opacity-10 animate-[pan_20s_linear_infinite]" />
         <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]" />
      </div>

      <div className="container px-4 md:px-6 relative z-20">
        <div className="space-y-6">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 animate-text-reveal"
          >
            {pageTitle}
          </h1>
          <p
            className="max-w-3xl mx-auto text-neutral-200 text-lg md:text-xl opacity-80 animate-text-reveal"
            style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
          >
            {pageDescription}
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="p-4 md:p-6 rounded-lg glass-morphic border border-primary/20 animate-text-reveal"
              style={{ animationDelay: `${0.6 + index * 0.2}s`, animationFillMode: 'backwards' }}
            >
              <h3 className="text-4xl lg:text-5xl font-bold text-primary text-glow">
                {isMounted ? <CountUp end={stat.value} /> : stat.value}{stat.unit}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
