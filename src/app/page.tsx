import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { Banner } from '@/components/sections/banner'
import { About } from '@/components/sections/about'
import { Gallery } from '@/components/sections/gallery'
import { Services } from '@/components/sections/services'
import { Testimonials } from '@/components/sections/testimonials'
import { Booking } from '@/components/sections/booking'
import { Contact } from '@/components/sections/contact'

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Banner />
        <About />
        <Gallery />
        <Services />
        <Testimonials />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
