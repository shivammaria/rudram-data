"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const demoTypes = [
    { id: "sales", label: "Sales Dashboard" },
    { id: "operations", label: "Operations Dashboard" },
    { id: "finance", label: "Finance Tracker" },
    { id: "custom", label: "Custom Demo" },
];

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  demoType: z.string({ required_error: "Please select a demo type." }),
  serviceId: z.string(),
});

type LiveDemoFormValues = z.infer<typeof FormSchema>;

interface LiveDemoFormProps {
    onFormSubmit: (data: LiveDemoFormValues) => void;
    defaultServiceId?: string;
}

export function LiveDemoForm({ onFormSubmit, defaultServiceId }: LiveDemoFormProps) {
    const form = useForm<LiveDemoFormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            company: '',
            serviceId: defaultServiceId || 'data-apps',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="demoType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Demo Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-background/50 border-primary/20 focus:bg-background focus:ring-primary">
                                        <SelectValue placeholder="Select a demo to see" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {demoTypes.map(type => (
                                        <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
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
                
                <FormField control={form.control} name="company" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company *</FormLabel>
                        <FormControl><Input {...field} className="bg-background/50 border-primary/20 focus:bg-background focus:ring-primary" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="submit" className="btn-glow">Next: Choose Access</Button>
                </div>
            </form>
        </Form>
    );
}
