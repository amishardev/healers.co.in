import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />
          <p className="text-sm text-secondary-foreground">
            &copy; {new Date().getFullYear()} Healers Homeopathy Clinic. All Rights Reserved.
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#"><Facebook className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#"><Instagram className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#"><Twitter className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
