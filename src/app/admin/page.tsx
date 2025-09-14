
'use client';

import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Calendar, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { format, isSameDay, parse } from 'date-fns';


export interface Appointment {
  id: string;
  name: string;
  phone: string;
  city: string;
  consultancyMode: 'Online' | 'Offline';
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: any;
}

interface DailyStats {
    total: number;
    confirmed: number;
    cancelled: number;
}


export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [dailyStats, setDailyStats] = useState<DailyStats>({ total: 0, confirmed: 0, cancelled: 0 });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setAuthLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [router]);
  
  useEffect(() => {
    if (authLoading) return;

    const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    
    const unsubscribeAppointments = onSnapshot(q, (querySnapshot) => {
      const appointmentsData: Appointment[] = [];
      querySnapshot.forEach((doc) => {
        appointmentsData.push({ id: doc.id, ...doc.data() } as Appointment);
      });
      setAppointments(appointmentsData);
      
      const today = new Date();
      const todaysAppointments = appointmentsData.filter(appt => {
        if (!appt.date) return false;
        try {
          const apptDate = parse(appt.date, 'MMMM do, yyyy', new Date());
          return isSameDay(apptDate, today);
        } catch (e) {
          console.error("Error parsing date:", appt.date, e);
          return false;
        }
      });
      
      const stats: DailyStats = {
          total: todaysAppointments.length,
          confirmed: todaysAppointments.filter(a => a.status === 'Confirmed').length,
          cancelled: todaysAppointments.filter(a => a.status === 'Cancelled').length
      };
      setDailyStats(stats);
      
      setLoading(false);
    }, (error) => {
      console.error("Error fetching appointments: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch appointments.",
      });
      setLoading(false);
    });

    return () => unsubscribeAppointments();
  }, [toast, authLoading]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error: any) {
      console.error('Logout failed:', error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
      });
    }
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    const appointmentRef = doc(db, 'appointments', id);
    try {
      await updateDoc(appointmentRef, { status });
      toast({
        title: "Success",
        description: `Appointment status updated to ${status}.`,
      });
    } catch (error) {
      console.error("Error updating status: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not update appointment status.",
      });
    }
  };
  
  const getStatusBadgeVariant = (status: Appointment['status']) => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'Confirmed':
        return 'default';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between pb-6">
          <div>
            <h1 className="font-headline text-3xl font-bold text-primary">
              Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">Hi <span className="font-bold">Dr. Surendra</span></p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{dailyStats.total}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{dailyStats.confirmed}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Canceled Today</CardTitle>
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{dailyStats.cancelled}</div>
                </CardContent>
            </Card>
        </section>

        <main>
          <Card>
            <CardHeader>
              <CardTitle>All Appointment Requests</CardTitle>
              <CardDescription>View and manage all incoming appointment requests.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
                  <p className="text-muted-foreground">Loading appointments...</p>
                </div>
              ) : appointments.length === 0 ? (
                 <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
                  <p className="text-muted-foreground">
                    No appointment requests yet.
                  </p>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                        <TableHead className="hidden lg:table-cell">Location</TableHead>
                        <TableHead className="hidden sm:table-cell">Mode</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appt) => (
                        <TableRow key={appt.id}>
                          <TableCell>
                            <div className="font-medium">{appt.name}</div>
                            <div className="text-sm text-muted-foreground">{appt.phone}</div>
                            <div className="text-sm text-muted-foreground md:hidden">{appt.date} at {appt.time}</div>
                             <div className="text-sm text-muted-foreground lg:hidden">{appt.city}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div>{appt.date}</div>
                            <div className="text-sm text-muted-foreground">{appt.time}</div>
                          </TableCell>
                           <TableCell className="hidden lg:table-cell">{appt.city}</TableCell>
                          <TableCell className="hidden sm:table-cell">{appt.consultancyMode}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(appt.status)}>{appt.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => updateAppointmentStatus(appt.id, 'Confirmed')}>
                                    Appointment Done
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateAppointmentStatus(appt.id, 'Cancelled')}>
                                    Appointment Cancel
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
