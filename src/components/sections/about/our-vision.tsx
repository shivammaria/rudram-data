
import aboutContent from "@/app/content/about.json";
import { Compass } from "lucide-react";

export default function OurVision() {
    const { ourVision } = aboutContent;
    return (
        <section id="vision" className="w-full py-20 lg:py-32 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.3),rgba(255,255,255,0))] opacity-50"></div>
                <Compass className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 text-primary/10 animate-spin-slow" />
            </div>
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60 mb-6">
                    {ourVision.headline}
                </h2>
                <p className="max-w-4xl mx-auto text-2xl lg:text-3xl text-muted-foreground font-light leading-snug">
                    &ldquo;{ourVision.statement}&rdquo;
                </p>
            </div>
        </section>
    );
}

