
"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import ctaContent from '@/app/content/cta-texts.json';
import { StartJourneyForm, type StartJourneyFormValues } from './start-journey-form';
import { Button } from '../ui/button';
import { FreeIntroCallModal } from './free-intro-call-modal';
import { ScrollArea } from '../ui/scroll-area';

export function StartJourneyModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Partial<StartJourneyFormValues>>({});
    
    const title = ctaContent.start_journey.title;
    const description = ctaContent.start_journey.description;
    
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setStep(1);
            setFormData({});
        }, 300);
    }

    const handleFormSubmit = (data: StartJourneyFormValues) => {
        console.log("Start Journey Data:", data);
        setFormData(data);
        setStep(2);
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="glass-morphic w-[calc(100vw-2rem)] max-w-lg rounded-xl p-0 overflow-hidden border-primary/20 shadow-2xl" onInteractOutside={handleClose}>
                <div className="flex flex-col max-h-[90vh]">
                    <DialogHeader className="px-6 pt-8 pb-4 text-left border-b border-primary/10">
                        <DialogTitle className="text-2xl md:text-3xl font-bold text-primary text-glow leading-tight">{title}</DialogTitle>
                        <DialogDescription className="text-muted-foreground mt-2 leading-relaxed">{description}</DialogDescription>
                    </DialogHeader>
                    
                    <ScrollArea className="flex-grow px-6">
                        <div className="py-8 pr-2">
                            {step === 1 && (
                                <StartJourneyForm
                                    onFormSubmit={handleFormSubmit}
                                    onCancel={handleClose}
                                />
                            )}

                            {step === 2 && (
                                <div className="space-y-8 text-center py-8">
                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                        <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold text-foreground">Thank You!</h3>
                                        <p className="text-muted-foreground text-lg leading-relaxed px-4">
                                            We've received your request. We'll send your personalized roadmap preview within 48 hours.
                                        </p>
                                        <p className="text-muted-foreground font-medium">
                                            Want to pick a time to chat now?
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4 px-6">
                                        <FreeIntroCallModal>
                                            <Button size="lg" className="w-full btn-glow h-14 text-lg">Book Quick Call</Button>
                                        </FreeIntroCallModal>
                                         <Button onClick={handleClose} variant="outline" className="w-full h-14 text-lg glass-morphic">
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
