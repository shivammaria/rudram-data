
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Calendar } from "lucide-react";
import teamContacts from '@/app/content/team-contacts.json';

interface DemoChannelSelectProps {
    onChannelSelect: (channel: 'email' | 'calendly') => void;
    onBack: () => void;
}

export function DemoChannelSelect({ onChannelSelect, onBack }: DemoChannelSelectProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
                <Card 
                    className="glass-morphic card-glow border-primary/20 text-center cursor-pointer hover:border-primary"
                    onClick={() => onChannelSelect('email')}
                >
                    <CardHeader className="items-center pb-2">
                        <Mail className="w-10 h-10 mb-2 text-primary" />
                        <CardTitle className="text-base font-bold">Email Instant Demo Link</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Receive it in your inbox now</CardDescription>
                    </CardContent>
                </Card>

                <Link href={teamContacts.primaryCalendarLink} target="_blank" passHref>
                    <Card className="glass-morphic card-glow border-primary/20 text-center cursor-pointer hover:border-primary h-full">
                         <CardHeader className="items-center pb-2">
                            <Calendar className="w-10 h-10 mb-2 text-primary" />
                            <CardTitle className="text-base font-bold">Schedule Guided Walkthrough</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Book a time with our team</CardDescription>
                        </CardContent>
                    </Card>
                </Link>
            </div>
            <div className="flex justify-start pt-4">
                 <Button variant="outline" onClick={onBack}>Back</Button>
            </div>
        </div>
    );
}
