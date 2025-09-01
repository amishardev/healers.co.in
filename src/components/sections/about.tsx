import Image from 'next/image'
import { Leaf, HeartHandshake } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="bg-secondary">
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                Welcome to Healers
              </h2>
              <p className="text-lg text-muted-foreground">
                Where compassionate care meets the science of homeopathy.
              </p>
            </div>
            <p className="text-secondary-foreground">
              At Healers, we believe in a holistic approach to health, treating the individual, not just the ailment. Our philosophy is rooted in the principle that the body has an innate ability to heal itself. We facilitate this natural process through personalized homeopathic treatments, designed to restore balance and vitality.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 text-primary p-3 rounded-full">
                  <Leaf className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Our Philosophy</h3>
                  <p className="text-sm text-muted-foreground">
                    Gentle, natural, and holistic healing tailored to you.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 text-primary p-3 rounded-full">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Our Founder</h3>
                  <p className="text-sm text-muted-foreground">
                    Dr. Surendra Kumar Agnihotri, with over 23 years of experience in classical homeopathy.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-80 md:h-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://raw.githubusercontent.com/amishardev/Healer-s-Homoeopathy-images/refs/heads/main/WhatsApp%20Image%202025-08-11%20at%207.27.09%20PM.jpeg"
              alt="Dr. Surendra Kumar Agnihotri, Founder of Healers Clinic"
              data-ai-hint="professional man"
              width={600}
              height={700}
              className="object-cover object-top w-full h-full transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
