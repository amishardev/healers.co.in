
'use client'

import * as React from 'react'
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
import { format, addDays, startOfDay, getDay } from 'date-fns'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const bookingFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  city: z.string().min(2, 'Please enter your city or place.'),
  consultancyMode: z.enum(['Offline', 'Online'], {
    required_error: 'Please select a consultancy mode.',
  }),
  date: z.date({ required_error: 'A date is required.' }),
  time: z.string({ required_error: 'A time slot is required.' }),
})

export function Booking() {
  const { toast } = useToast()
  const [timeSlots, setTimeSlots] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      city: '',
      consultancyMode: 'Offline',
    },
  })

  const selectedDate = form.watch('date');

  React.useEffect(() => {
    if (selectedDate) {
      const dayOfWeek = getDay(selectedDate); // Sunday = 0, Monday = 1, etc.
      const newTimeSlots = generateTimeSlots(dayOfWeek);
      setTimeSlots(newTimeSlots);
      form.setValue('time', ''); // Reset time when date changes
    }
  }, [selectedDate, form]);

  const generateTimeSlots = (day: number) => {
    const slots: string[] = [];
    let startHour: number, startMinute: number, endHour: number;

    if (day === 0) { // Sunday
      startHour = 9;
      startMinute = 30;
      endHour = 14;
    } else { // Monday to Saturday
      startHour = 17;
      startMinute = 0;
      endHour = 21;
    }

    const interval = 15;
    const date = new Date();
    date.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHour, 0, 0, 0);

    while (date < endDate) {
      const startTime = format(date, 'hh:mm a');
      date.setMinutes(date.getMinutes() + interval);
      const endTime = format(date, 'hh:mm a');
      slots.push(`${startTime} - ${endTime}`);
    }

    return slots;
  };

  async function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    setLoading(true);
    try {
      await addDoc(collection(db, 'appointments'), {
        ...values,
        date: format(values.date, 'MMMM do, yyyy'), // Store date as a formatted string
        status: 'Pending',
        createdAt: serverTimestamp(),
      });

      toast({
        title: "Appointment Requested",
        description: "Thank you! We have received your request and will contact you shortly to confirm.",
      });

      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Could not submit your appointment. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }
  
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 10);

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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </div>
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>City / place</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Kanpur or Vikas Nagar" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="consultancyMode"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>Mode of Consultancy</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="Offline" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Offline (In-Clinic)
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="Online" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Online (Video Call)
                                        </FormLabel>
                                    </FormItem>
                                    </RadioGroup>
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
                                        date < today || date > maxDate
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
                                <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger disabled={!selectedDate}>
                                    <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {timeSlots.length > 0 ? (
                                        timeSlots.map((slot) => (
                                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="-" disabled>
                                            Please select a date first
                                        </SelectItem>
                                    )}
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>
                        <Button type="submit" className="w-full" size="lg" disabled={loading}>
                            {loading ? 'Submitting...' : 'Request Appointment'}
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  )
}
