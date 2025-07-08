import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const heroImage = {
  src: "https://raw.githubusercontent.com/amishardev/Healer-s-Homoeopathy-images/main/ChatGPT%20Image%20Jul%208,%202025,%2009_31.png",
  alt: "Natural homeopathic remedies and herbs on a wooden table",
  hint: "homeopathy herbs"
}

export function Hero() {
  return (
    <section id="home" className="relative w-full h-[80vh] md:h-screen">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        data-ai-hint={heroImage.hint}
        fill
        className="object-cover"
        priority
      />
      {/* Gradient for mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:hidden" />
      {/* Gradient for desktop */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/60 to-transparent md:block" />

      <div className="relative h-full flex items-center justify-center md:justify-start">
        <div className="container">
          <div className="max-w-xl text-center md:text-left text-white">
            <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg">
              Healers Homeopathy Clinic
            </h1>
            <p className="mt-4 text-lg md:text-xl text-neutral-200 drop-shadow-md">
              Your Path to Natural Wellness and Lasting Health.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="#booking">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
