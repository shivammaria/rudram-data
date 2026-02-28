
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
  { id: 'data-infrastructure', label: 'Data Infra' },
  { id: 'other', label: 'Other' },
];

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  exploringAreas: z.array(z.string()).refine(value => value.some(item => item), {
    message: "Select at least one area.",
  }),
  goal: z.string().min(10, { message: "Describe your goal (min. 10 chars)." }),
  consent: z.boolean().refine(val => val === true, { message: "Consent is required." }),
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
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-foreground">Name *</FormLabel>
                            <FormControl><Input {...field} className="bg-background/40 border-primary/20 focus:ring-primary h-12" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-foreground">Email *</FormLabel>
                            <FormControl><Input {...field} className="bg-background/40 border-primary/20 focus:ring-primary h-12" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                 <FormField control={form.control} name="company" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-semibold text-foreground">Company *</FormLabel>
                        <FormControl><Input {...field} className="bg-background/40 border-primary/20 focus:ring-primary h-12" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField
                  control={form.control}
                  name="exploringAreas"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base font-semibold text-foreground">Which area are you exploring? *</FormLabel>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-primary/5 p-4 rounded-xl border border-primary/10">
                      {areas.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="exploringAreas"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0"
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
                                <FormLabel className="font-normal text-sm md:text-base cursor-pointer">
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
                        <FormLabel className="font-semibold text-foreground">Briefly, what is your main goal? *</FormLabel>
                        <FormControl><Textarea {...field} className="bg-background/40 border-primary/20 focus:ring-primary min-h-[120px] resize-none" placeholder="e.g., Automate financial reports, improve sales tracking..." /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                
                <FormField control={form.control} name="consent" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-primary/20 p-5 glass-morphic">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-semibold text-foreground">I consent to Rudram contacting me about this request.</FormLabel>
                             <p className="text-xs text-muted-foreground mt-1">
                                View our <Link href="/privacy" className="underline hover:text-primary transition-colors">Privacy Policy</Link>.
                            </p>
                            <FormMessage />
                        </div>
                    </FormItem>
                )} />

                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 pb-2">
                    <Button type="button" variant="outline" onClick={onCancel} className="h-12 px-8 glass-morphic">Cancel</Button>
                    <Button type="submit" size="lg" className="btn-glow px-8 h-12 font-bold tracking-wide">Get my Roadmap Preview</Button>
                </div>
            </form>
        </Form>
    );
}
