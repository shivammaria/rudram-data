
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Phone, Mail, Calendar } from "lucide-react";
import type { ContactChannel, FormData } from "./health-check-modal";
import teamContacts from '@/app/content/team-contacts.json';
import Link from "next/link";

const channels = [
    { id: "whatsapp", icon: MessageCircle, title: "WhatsApp Chat", description: "Immediate response" },
    { id: "call", icon: Phone, title: "Make a Call", description: "Direct line to our team" },
    { id: "email", icon: Mail, title: "Request by Email", description: "Within 24 hours" },
    { id: "calendly", icon: Calendar, title: "Book on Calendar", description: "Choose your own time" },
] as const;


interface ChannelSelectProps {
    formData: Partial<FormData>;
    onChannelSelect: (channel: ContactChannel) => void;
    onBack: () => void;
}

export function ChannelSelect({ formData, onChannelSelect, onBack }: ChannelSelectProps) {

    const whatsAppMessage = encodeURIComponent(
        `Hi Rudram — I’d like to book a Data Health Check for the '${formData.serviceId}' service.
        \nName: ${formData.name}
        \nCompany: ${formData.company}
        \nEmail: ${formData.email}`
    );
    const whatsappUrl = `https://wa.me/${teamContacts.whatsapp}?text=${whatsAppMessage}`;
    const telUrl = `tel:${teamContacts.phone}`;
    const calendlyUrl = teamContacts.primaryCalendarLink;

    const handleChannelClick = (channelId: ContactChannel) => {
        if (channelId === 'whatsapp') {
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        } else if (channelId === 'call') {
            window.location.href = telUrl;
        } else if (channelId === 'calendly') {
            window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
        }
        onChannelSelect(channelId);
    }


    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {channels.map(channel => (
                    <Card 
                        key={channel.id}
                        className="glass-morphic card-glow border-primary/20 text-center cursor-pointer hover:border-primary h-full"
                        onClick={() => handleChannelClick(channel.id)}
                    >
                        <CardHeader className="items-center pb-2">
                            <channel.icon className="w-10 h-10 mb-2 text-primary" />
                            <CardTitle className="text-base font-bold">{channel.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{channel.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex justify-start pt-4">
                 <Button variant="outline" onClick={onBack}>Back</Button>
            </div>
        </div>
    );
}
