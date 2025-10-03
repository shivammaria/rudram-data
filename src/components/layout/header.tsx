
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import settings from "@/app/content/settings.json";
import navLinks from "@/app/content/nav-links.json";
import { HealthCheckModal } from "@/components/modals/health-check-modal";
import { useState } from "react";


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-morphic">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <img src="/images/logo.png" alt={`${settings.appName} logo`} width={48} height={48} />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-200">Rudram</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <HealthCheckModal defaultServiceId="health-check">
            <Button
              variant="default"
              className="hidden md:inline-flex btn-glow bg-primary/80 hover:bg-primary"
            >
              {settings.cta.primary.text}
            </Button>
          </HealthCheckModal>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  prefetch={false}
                   onClick={() => setMobileMenuOpen(false)}
                >
                  <img src="/images/logo.png" alt={`${settings.appName} logo`} width={48} height={48} />
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-200">Rudram</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                    prefetch={false}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <HealthCheckModal defaultServiceId="health-check">
                  <Button variant="default" className="w-full btn-glow">
                    {settings.cta.primary.text}
                  </Button>
                </HealthCheckModal>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
