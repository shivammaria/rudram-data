
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, Phone, Linkedin, MapPin } from "lucide-react";
import contactContent from "@/app/content/contact.json";
import settings from "@/app/content/settings.json";
import teamContacts from "@/app/content/team-contacts.json";
import { HealthCheckModal } from "@/components/modals/health-check-modal";

export default function ContactForm() {
  return (
    <section id="contact-form" className="w-full py-20 lg:py-32 bg-background/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3 space-y-8 glass-morphic p-8 md:p-12 rounded-2xl border border-primary/20 card-glow h-fit">
                <div className="text-center md:text-left space-y-2">
                    <h3 className="text-3xl font-bold text-primary text-glow">Send us a message</h3>
                    <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Input placeholder={contactContent.form.namePlaceholder} className="bg-background/40 border-primary/20 focus:ring-primary h-12" />
                        </div>
                        <div className="space-y-2">
                            <Input type="email" placeholder={contactContent.form.emailPlaceholder} className="bg-background/40 border-primary/20 focus:ring-primary h-12" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Input placeholder={contactContent.form.businessPlaceholder} className="bg-background/40 border-primary/20 focus:ring-primary h-12" />
                    </div>
                    <div className="space-y-2">
                        <Textarea placeholder={contactContent.form.messagePlaceholder} className="min-h-[160px] bg-background/40 border-primary/20 focus:ring-primary resize-none p-4" />
                    </div>
                    <Button type="submit" size="lg" className="w-full btn-glow h-14 text-lg font-bold">
                        {contactContent.form.submitText}
                    </Button>
                </form>
            </div>

            <div className="lg:col-span-2 space-y-8">
                <div className="w-full rounded-2xl glass-morphic border border-primary/20 p-8 flex flex-col items-center justify-center text-center card-glow">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <Calendar className="h-10 w-10 text-primary text-glow" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{contactContent.calendly.headline}</h3>
                    <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">{contactContent.calendly.subheadline}</p>
                    <HealthCheckModal>
                      <Button size="lg" className="btn-glow px-12 h-12">
                        {contactContent.calendly.ctaText}
                      </Button>
                    </HealthCheckModal>
                </div>

                <div className="w-full rounded-2xl glass-morphic border border-primary/20 p-8 space-y-8 card-glow">
                    <h3 className="text-2xl font-bold text-center text-primary text-glow border-b border-primary/10 pb-4">Direct Contact</h3>
                    
                    <div className="space-y-6">
                        {/* Australia Office */}
                        <div className="text-left space-y-3">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-accent" />
                                <h4 className="font-bold text-foreground">Australia (Primary)</h4>
                            </div>
                            <div className="pl-7 space-y-2">
                                <a href={`tel:${teamContacts.australia.phone1}`} className="block text-muted-foreground hover:text-primary transition-colors">{teamContacts.australia.phone1}</a>
                                <a href={teamContacts.australia.mapUrl} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary transition-colors leading-relaxed">{teamContacts.australia.address}</a>
                            </div>
                        </div>

                        {/* India Office */}
                        <div className="text-left space-y-3 pt-4 border-t border-primary/10">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-accent" />
                                <h4 className="font-bold text-foreground">India (Secondary)</h4>
                            </div>
                            <div className="pl-7 space-y-2">
                                <a href={`tel:${teamContacts.india.phone}`} className="block text-muted-foreground hover:text-primary transition-colors">{teamContacts.india.phone}</a>
                                <span className="block text-sm text-muted-foreground leading-relaxed">{teamContacts.india.address}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-6 border-t border-primary/10 space-y-4">
                        <div className="flex items-center gap-4 group justify-center md:justify-start">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Mail className="h-5 w-5 text-accent group-hover:text-primary transition-colors" />
                            </div>
                            <a href={`mailto:${contactContent.directContact.email}`} className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">{contactContent.directContact.email}</a>
                        </div>
                        <div className="flex justify-center md:justify-start pt-4 gap-8">
                            <Link href={settings.socials.linkedin} aria-label="LinkedIn" className="hover:scale-110 transition-transform">
                                <Linkedin className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
