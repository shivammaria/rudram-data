"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import services from '@/app/content/services.json';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  phone: z.string().optional(),
  businessSize: z.enum(["1-10", "11-50", "51-250", "250+"]),
  message: z.string().optional(),
  serviceId: z.string(),
  consent: z.boolean().refine(val => val === true, { message: "You must consent to be contacted." }),
});

type HealthCheckFormValues = z.infer<typeof FormSchema>;

interface HealthCheckFormProps {
    onFormSubmit: (data: HealthCheckFormValues) => void;
    defaultServiceId?: string;
}

export function HealthCheckForm({ onFormSubmit, defaultServiceId }: HealthCheckFormProps) {
    const form = useForm<HealthCheckFormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            company: '',
            phone: '',
            businessSize: '11-50',
            message: '',
            serviceId: defaultServiceId || 'health-check',
            consent: false,
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="serviceId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Service of Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-background/50 border-primary/20 focus:bg-background focus:ring-primary">
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {services.services.map(service => (
                                        <SelectItem key={service.id} value={service.id}>{service.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl><Input {...field} className="bg-background/50 border-primary/20 focus:bg-background focus:ring-primary" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl><Input {...field} className="bg-background/50 border-primary/20 focus:bg-background focus:ring-primary" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="company" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company *</FormLabel>
                            <FormControl><Input {...field} className="bg-background/50 border-primary/20 focus:bg-background focus:ring-primary" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl><Input {...field} className="bg-background/50 border-primary/20 focus:bg-background focus:ring-primary" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <FormField
                    control={form.control}
                    name="businessSize"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business Size</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-background/50 border-primary/20 focus:bg-background focus:ring-primary">
                                        <SelectValue placeholder="Select your company size" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1-10">1-10 employees</SelectItem>
                                    <SelectItem value="11-50">11-50 employees</SelectItem>
                                    <SelectItem value="51-250">51-250 employees</SelectItem>
                                    <SelectItem value="250+">250+ employees</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl><Textarea {...field} className="bg-background/50 border-primary/20 focus:bg-background focus:ring-primary" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="consent" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 glass-morphic">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>I consent to Rudram contacting me about this request.</FormLabel>
                            <p className="text-sm text-muted-foreground">
                                You can view our <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                            </p>
                            <FormMessage />
                        </div>
                    </FormItem>
                )} />

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="submit" className="btn-glow">Next: Choose Contact</Button>
                </div>
            </form>
        </Form>
    );
}
