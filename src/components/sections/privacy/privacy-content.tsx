
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Key, FileLock, Gavel, Download } from "lucide-react";
import privacyContent from "@/app/content/privacy.json";
import { cn } from "@/lib/utils";

const icons: { [key: string]: React.ReactNode } = {
  ShieldCheck: <ShieldCheck className="h-8 w-8 text-primary transition-colors duration-300" />,
  Lock: <Lock className="h-8 w-8 text-primary transition-colors duration-300" />,
  Key: <Key className="h-8 w-8 text-primary transition-colors duration-300" />,
  FileLock: <FileLock className="h-8 w-8 text-primary transition-colors duration-300" />,
  Gavel: <Gavel className="h-8 w-8 text-primary transition-colors duration-300" />,
};

export default function PrivacyContent() {
    const [activeSection, setActiveSection] = useState<string>(privacyContent.sections[0].id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-30% 0px -70% 0px" }
        );

        privacyContent.sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => {
            privacyContent.sections.forEach((section) => {
                const el = document.getElementById(section.id);
                if (el) observer.unobserve(el);
            });
        };
    }, []);

  return (
    <section id="privacy-content" className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
            <p className="text-muted-foreground">Last Updated: {new Date(privacyContent.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <Button variant="outline" className="mt-4 btn-glow">
                <Download className="mr-2 h-4 w-4" />
                {privacyContent.cta.text}
            </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
            {/* Sticky Nav */}
            <aside className="hidden lg:block lg:col-span-1 sticky top-28 h-fit">
                <nav className="space-y-2">
                    {privacyContent.sections.map(section => (
                        <Link key={section.id} href={`#${section.id}`}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-lg text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary",
                                activeSection === section.id && "bg-primary/10 text-primary font-semibold"
                            )}
                        >
                            <div className={cn("transition-transform duration-300", activeSection === section.id && "scale-110")}>
                                {icons[section.icon]}
                            </div>
                            <span>{section.title}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Content */}
            <main className="lg:col-span-3 space-y-16">
                 {privacyContent.sections.map(section => (
                    <div key={section.id} id={section.id} className="scroll-mt-24">
                        <div className="p-8 rounded-xl glass-morphic border border-primary/20 card-glow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="lg:hidden">
                                    {icons[section.icon]}
                                </div>
                                <h2 className="text-3xl font-bold text-primary text-glow">{section.title}</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
                        </div>
                    </div>
                ))}
            </main>
        </div>
      </div>
    </section>
  );
}
