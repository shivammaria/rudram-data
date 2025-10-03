
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
                                // For now, we just close. Later we can add confirmation.
                                handleClose();
                            }}
                            onBack={() => setStep(1)}
                        />
                    )
                default:
                    return <p>Something went wrong.</p>;
            }
        }
        
        // Default flow for 'health-check', 'strategy-advisory', etc.
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
            <DialogContent className="glass-morphic w-[95vw] max-w-lg rounded-lg md:w-full max-h-[90vh] flex flex-col" onInteractOutside={handleClose}>
                <DialogHeader className="flex-shrink-0 px-6 pt-6">
                    <DialogTitle className="text-2xl text-primary text-glow">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto px-6">
                    <ScrollArea className="h-full">
                       <div className="py-6">
                           {renderContent()}
                       </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
