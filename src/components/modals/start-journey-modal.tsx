
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
        // In a real app, you would handle the submission here (e.g., send to a backend).
        // For now, we'll just log it and show a success message.
        console.log("Start Journey Data:", data);
        setFormData(data); // Save data
        setStep(2); // Move to a confirmation/thank you step
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="glass-morphic w-[95vw] max-w-lg rounded-lg md:w-full max-h-[90vh] flex flex-col" onInteractOutside={handleClose}>
                <DialogHeader className="flex-shrink-0 px-6 pt-6">
                    <DialogTitle className="text-2xl text-primary text-glow">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                
                <div className="flex-grow overflow-y-auto px-6">
                    <ScrollArea className="h-full">
                        <div className="py-6">
                            {step === 1 && (
                                <StartJourneyForm
                                    onFormSubmit={handleFormSubmit}
                                    onCancel={handleClose}
                                />
                            )}

                            {step === 2 && (
                                <div className="space-y-6 text-center py-8">
                                    <h3 className="text-xl font-semibold">Thank You!</h3>
                                    <p className="text-muted-foreground">
                                        We've received your request. We'll send your personalized roadmap preview within 48 hours.
                                    </p>
                                    <p className="text-muted-foreground">
                                        Want to pick a time to chat now?
                                    </p>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <FreeIntroCallModal>
                                            <Button className="btn-glow">Book Quick Call</Button>
                                        </FreeIntroCallModal>
                                         <Button onClick={handleClose} variant="outline">
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
