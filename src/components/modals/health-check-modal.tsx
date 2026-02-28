
"use client";

import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import ctaContent from '@/app/content/cta-texts.json';
import { HealthCheckForm } from './health-check-form';
import { ChannelSelect } from './channel-select';
import { Confirmation } from './confirmation';
import { LiveDemoForm } from './live-demo-form';
import { DemoChannelSelect } from './demo-channel-select';
import { ScrollArea } from '../ui/scroll-area';

export type Service = {
    id: string;
    title: string;
    description: string;
};

export type FormData = {
    name: string;
    email: string;
    company: string;
    phone?: string;
    businessSize: "1-10" | "11-50" | "51-250" | "250+";
    message?: string;
    serviceId: string;
    consent: boolean;
    currentTools?: string[];
    demoType?: string;
};

export type ContactChannel = "whatsapp" | "call" | "email" | "calendly";

export function HealthCheckModal({ children, defaultServiceId }: { children: React.ReactNode, defaultServiceId?: string }) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Partial<FormData>>({ serviceId: defaultServiceId });
    const [channel, setChannel] = useState<ContactChannel | null>(null);

    const serviceId = useMemo(() => formData.serviceId || defaultServiceId || 'health-check', [formData.serviceId, defaultServiceId]);

    const title = useMemo(() => {
        const serviceCtaKey = serviceId as keyof typeof ctaContent;
        const serviceCta = ctaContent[serviceCtaKey] || ctaContent.book_health_check;
        if (step === 3) return "Confirm Your Request";
        if (step === 2) {
             return serviceId === 'data-apps' ? 'Choose Access Method' : 'Choose Your Contact Method';
        }
        return serviceCta.title;
    }, [step, serviceId]);

    const description = useMemo(() => {
        const serviceCtaKey = serviceId as keyof typeof ctaContent;
        const serviceCta = ctaContent[serviceCtaKey] || ctaContent.book_health_check;
        if (step === 3) return "Please review your details before submitting.";
        if (step === 2) {
            return serviceId === 'data-apps' ? "How would you like to access the demo?" : "How would you like us to get in touch?";
        }
        return serviceCta.description;
    }, [step, serviceId]);
    
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setStep(1);
            setFormData({ serviceId: defaultServiceId });
            setChannel(null);
        }, 300);
    }
    
    const renderContent = () => {
        if (serviceId === 'data-apps') {
            switch (step) {
                case 1:
                    return (
                        <LiveDemoForm
                            onFormSubmit={(data) => {
                                setFormData(data);
                                setStep(2);
                            }}
                            defaultServiceId={serviceId}
                        />
                    );
                case 2:
                    return (
                        <DemoChannelSelect
                            onChannelSelect={(selectedChannel) => {
                                handleClose();
                            }}
                            onBack={() => setStep(1)}
                        />
                    )
                default:
                    return <p>Something went wrong.</p>;
            }
        }
        
        switch (step) {
            case 1:
                return (
                     <HealthCheckForm
                        defaultServiceId={serviceId}
                        onFormSubmit={(data) => {
                            setFormData(data);
                            setStep(2);
                        }}
                    />
                );
            case 2:
                return (
                    <ChannelSelect
                        formData={formData}
                        onChannelSelect={(selectedChannel) => {
                            setChannel(selectedChannel);
                            setStep(3);
                        }}
                        onBack={() => setStep(1)}
                    />
                );
            case 3:
                return (
                    <Confirmation
                        formData={formData as FormData}
                        channel={channel!}
                        onBack={() => setStep(2)}
                        onClose={handleClose}
                    />
                )
            default:
                return <p>Something went wrong.</p>;
        }
    };
    
    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            if (!isOpen) handleClose();
            else setOpen(true);
        }}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="glass-morphic w-[calc(100vw-2rem)] max-w-lg rounded-xl p-0 overflow-hidden border-primary/20 shadow-2xl" onInteractOutside={handleClose}>
                <div className="flex flex-col max-h-[90vh]">
                    <DialogHeader className="px-6 pt-8 pb-4 text-left border-b border-primary/10">
                        <DialogTitle className="text-2xl md:text-3xl font-bold text-primary text-glow leading-tight">{title}</DialogTitle>
                        <DialogDescription className="text-muted-foreground mt-2 leading-relaxed">{description}</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="flex-grow px-6">
                       <div className="py-8 pr-2">
                           {renderContent()}
                       </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
