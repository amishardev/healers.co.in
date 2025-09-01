'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const bookingFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  date: z.date({ required_error: 'A date is required.' }),
  time: z.string({ required_error: 'A time slot is required.' }),
})

export function Booking() {
    const { toast } = useToast()
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  })

  function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    const recipient = 'healingartclinic@gmail.com';
    const subject = `🗓️ New Appointment Request from ${values.name}`;
    const body = `
Dear Dr. Agnihotri,

You have received a new appointment request via the website:

Patient Details
Full Name: ${values.name}
Phone Number: ${values.phone}

Appointment Preferences
Preferred Date: ${format(values.date, 'PPP')}
Preferred Time Slot: ${values.time}

Please contact the patient to confirm the booking or provide alternate options if necessary.

Warm regards,
Healers Homeopathic Clinic
Email Notifications System by Amish Sharma
`.trim();

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Instead of navigating, we use window.open() which is a more standard way to handle mailto links.
    // This should be more reliable across different browsers.
    window.open(mailtoLink);

    toast({
      title: "Opening your email client",
      description: "Please review and send the pre-filled email to request your appointment.",
    });

    form.reset();
  }

  return (
    <section id="booking" className="bg-secondary">
      <div className="container py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl md:text-4xl font-bold">Request an Appointment</CardTitle>
                    <CardDescription className="text-lg">
                        Fill out the form below and we'll get back to you to confirm your booking.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. 9876543210" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Preferred Date</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                        'w-full pl-3 text-left font-normal',
                                        !field.value && 'text-muted-foreground'
                                        )}
                                    >
                                        {field.value ? (
                                        format(field.value, 'PPP')
                                        ) : (
                                        <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date < new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                    />
                                </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preferred Time Slot</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</SelectItem>
                                    <SelectItem value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</SelectItem>
                                    <SelectItem value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</SelectItem>
                                    <SelectItem value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</SelectItem>
                                    <SelectItem value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>
                        <Button type="submit" className="w-full" size="lg">Request Appointment</Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  )
}