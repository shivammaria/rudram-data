
"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github, Youtube, Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import settings from "@/app/content/settings.json";
import teamContacts from "@/app/content/team-contacts.json";
import navLinks from "@/app/content/nav-links.json";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us"},
    { href: "/#why-us", label: "Why Rudram" },
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Case Stories" },
    { href: "/contact", label: "Contact" }
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative bg-background/50 pt-20 pb-20 mt-20 overflow-hidden sm:pb-20">
        <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute h-full w-full bg-gradient-to-t from-black via-primary/10 to-background"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20"/>
        </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false}>
              <img src="/images/logo.png" alt={`${settings.appName} logo`} width={52} height={52} className="animate-[pulse_5s_ease-in-out_infinite]" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-200">Rudram</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
                {settings.tagline}
            </p>
          </div>

          {/* Center Column */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
             <h3 className="text-lg font-semibold mb-4 relative text-foreground">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary animate-pulse-glow"></span>
            </h3>
            <nav className="flex flex-col gap-2">
                {footerLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1"
                    prefetch={false}
                    >
                    {link.label}
                    </Link>
                ))}
            </nav>
          </div>

          {/* Right Column */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 relative text-foreground">
                Get In Touch
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary animate-pulse-glow"></span>
            </h3>
            <div className="space-y-4 text-sm w-full">
                {/* Australia Office */}
                <div className="glass-morphic p-4 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Australia (Primary Office)</h4>
                    <div className="flex items-center gap-3 mb-2">
                        <Phone className="w-4 h-4 text-accent"/>
                        <a href={`tel:${teamContacts.australia.phone1}`} className="text-muted-foreground hover:text-primary">{teamContacts.australia.phone1}</a>
                        /
                        <a href={`tel:${teamContacts.australia.phone2}`} className="text-muted-foreground hover:text-primary">{teamContacts.australia.phone2}</a>
                    </div>
                     <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0"/>
                        <a href={teamContacts.australia.mapUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">{teamContacts.australia.address}</a>
                    </div>
                </div>
                 {/* India Office */}
                <div className="glass-morphic p-4 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">India (Secondary Office)</h4>
                    <div className="flex items-center gap-3 mb-2">
                        <Phone className="w-4 h-4 text-accent"/>
                        <a href={`tel:${teamContacts.india.phone}`} className="text-muted-foreground hover:text-primary">{teamContacts.india.phone}</a>
                    </div>
                     <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0"/>
                        <span className="text-muted-foreground">{teamContacts.india.address}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                    <Mail className="w-4 h-4 text-accent"/>
                    <a href={`mailto:${settings.contact.email}`} className="text-muted-foreground hover:text-primary">{settings.contact.email}</a>
                </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/20 flex flex-col sm:flex-row justify-between items-center gap-4">
             <p className="text-center text-sm text-muted-foreground">
                © {currentYear || new Date().getFullYear()} {settings.companyName}. All rights reserved.
            </p>
            <div className="flex justify-center items-center gap-4">
                <Link href={settings.socials.linkedin} aria-label="LinkedIn" className="group">
                <Linkedin className="h-6 w-6 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-125 group-hover:animate-pulse" />
                </Link>
            </div>
        </div>
      </div>
      
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full btn-glow z-50 transition-all duration-300 hover:scale-110"
          size="icon"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </footer>
  );
}
