"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const areas = [
  { id: 'reporting', label: 'Reporting' },
  { id: 'sales-ops', label: 'Sales Ops' },
  { id: 'finance', label: 'Finance' },
  { id: 'crm', label: 'CRM' },
  { id: 'data-infrastructure', label: 'Data Infrastructure' },
  { id: 'other', label: 'Other' },
];

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  exploringAreas: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one area.",
  }),
  goal: z.string().min(10, { message: "Please briefly describe your goal (min. 10 characters)." }),
  consent: z.boolean().refine(val => val === true, { message: "You must consent to be contacted." }),
});

export type StartJourneyFormValues = z.infer<typeof FormSchema>;

interface StartJourneyFormProps {
    onFormSubmit: (data: StartJourneyFormValues) => void;
    onCancel: () => void;
}

export function StartJourneyForm({ onFormSubmit, onCancel }: StartJourneyFormProps) {
    const form = useForm<StartJourneyFormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            company: '',
            exploringAreas: [],
            goal: '',
            consent: false,
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
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

                <FormField
                  control={form.control}
                  name="exploringAreas"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Which area are you exploring? *</FormLabel>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {areas.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="exploringAreas"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField control={form.control} name="goal" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Briefly, what is your main goal? *</FormLabel>
                        <FormControl><Textarea {...field} className="bg-background/50 border-primary/20 focus:bg-background focus:ring-primary" placeholder="e.g., Automate financial reports, improve sales tracking..." /></FormControl>
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
                    <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" className="btn-glow">Get my Roadmap Preview</Button>
                </div>
            </form>
        </Form>
    );
}
