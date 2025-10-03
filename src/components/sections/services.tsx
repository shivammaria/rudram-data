
"use client";

import { Button } from "@/components/ui/button";
import { HealthCheckModal } from "@/components/modals/health-check-modal";
import { CheckCircle, Stethoscope, AreaChart, Compass, Server, BarChart, FileText, Share2, Award, Zap, Users, PieChart, Map, TrendingUp, Key } from "lucide-react";
import servicesContent from "@/app/content/services.json";

const serviceIcons: { [key: string]: React.ReactNode } = {
    Stethoscope: <Stethoscope className="h-12 w-12 text-primary text-glow" />,
    Dashboard: <AreaChart className="h-12 w-12 text-primary text-glow" />,
    Compass: <Compass className="h-12 w-12 text-primary text-glow" />,
};

const keyPointIcons: { [key: string]: React.ReactNode } = {
    Systems: <Server className="h-6 w-6 text-accent" />,
    Scorecard: <BarChart className="h-6 w-6 text-accent" />,
    DataFlow: <Share2 className="h-6 w-6 text-accent" />,
    QuickWins: <Award className="h-6 w-6 text-accent" />,
    Workflow: <FileText className="h-6 w-6 text-accent" />,
    RealTime: <Zap className="h-6 w-6 text-accent" />,
    Training: <Users className="h-6 w-6 text-accent" />,
    Tools: <PieChart className="h-6 w-6 text-accent" />,
    KPIs: <Key className="h-6 w-6 text-accent" />,
    Recommendations: <Map className="h-6 w-6 text-accent" />,
    Advisory: <Users className="h-6 w-6 text-accent" />,
    Roadmap: <TrendingUp className="h-6 w-6 text-accent" />,
};

export default function Services() {
    return (
        <section id="services" className="w-full py-20 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center space-y-4 mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60 text-glow">
                        {servicesContent.pageTitle}
                    </h1>
                    <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
                        {servicesContent.pageDescription}
                    </p>
                </div>

                <div className="space-y-24">
                    {servicesContent.services.map((service, serviceIdx) => (
                        <div key={service.id} className="grid lg:grid-cols-2 gap-12 items-center group">
                            <div className={`relative w-full h-80 lg:h-full flex items-center justify-center [perspective:1000px] ${serviceIdx % 2 === 0 ? 'lg:order-2' : ''}`}>
                                <div className="relative w-64 h-64 [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(-15deg)_scale(1.05)]">
                                     <div className="absolute inset-0 rounded-2xl glass-morphic border-2 border-primary/30 p-4 shadow-2xl shadow-primary/20 animate-float flex items-center justify-center">
                                        {serviceIcons[service.icon]}
                                     </div>
                                </div>
                            </div>
                            <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
                                <h2 className="text-3xl md:text-4xl font-bold text-primary text-glow">{service.title}</h2>
                                <p className="text-lg text-muted-foreground max-w-lg">{service.description}</p>
                                <ul className="space-y-4 max-w-lg">
                                    {service.keyPoints.map((point, index) => (
                                        <li key={index} className="flex items-start gap-4 text-left">
                                            <div className="w-8 h-8 rounded-full glass-morphic flex items-center justify-center flex-shrink-0 border border-accent/30 mt-1">
                                                {keyPointIcons[point.icon] || <CheckCircle className="h-5 w-5 text-accent" />}
                                            </div>
                                            <span className="text-muted-foreground">{point.text}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="italic text-primary/80 text-lg font-semibold border-l-4 border-primary/50 pl-4 py-2 text-left self-stretch lg:self-start max-w-lg">
                                  {service.valueProposition}
                                </p>
                                <HealthCheckModal defaultServiceId={service.id}>
                                    <Button size="lg" className="btn-glow px-8 py-6 text-lg">
                                        {service.cta.text}
                                    </Button>
                                </HealthCheckModal>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
