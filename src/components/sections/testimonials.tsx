'use client'

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "After struggling with chronic migraines for years, I found lasting relief through Dr. Surendra Kumar Agnihotri’s treatment. His deep understanding and holistic approach at Healers Homeopathic Clinic changed my life.",
    name: "Anjali Mehta",
    avatar: { src: "https://placehold.co/100x100.png", hint: "happy woman" }
  },
  {
    quote: "I had recurring skin allergies that no one could diagnose properly. Dr. Agnihotri’s personalized care and natural remedies have cleared my skin and restored my confidence. Truly grateful!",
    name: "Rajeev Sharma",
    avatar: { src: "https://placehold.co/100x100.png", hint: "smiling man" }
  },
  {
    quote: "My child had frequent colds and low immunity. Thanks to Dr. Surendra Kumar Agnihotri, we’ve seen a major improvement in her health. Healers Homeopathic Clinic is a blessing for our family.",
    name: "Priya Nambiar",
    avatar: { src: "https://placehold.co/100x100.png", hint: "woman face" }
  }
]

export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section id="testimonials" className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            What Our Patients Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Stories of healing and hope from those we've helped.
          </p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto mt-12"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-4">
                  <Card className="h-full bg-card">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <blockquote className="text-muted-foreground italic mb-6">
                        “{testimonial.quote}”
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar.src} alt={testimonial.name} data-ai-hint={testimonial.avatar.hint} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
