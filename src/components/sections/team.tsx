import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Dr. Surendra Kumar Agnihotri",
    role: "Founder & Chief Homeopath",
    bio: "With 15+ years of experience, Dr. Agnihotri is dedicated to classical homeopathy and patient-centric care.",
    image: { src: "https://placehold.co/400x400.png", hint: "professional man" }
  },
  {
    name: "Dr. Rohan Gupta",
    role: "Associate Homeopath",
    bio: "Dr. Gupta specializes in pediatric care and chronic lifestyle diseases, blending modern diagnostics with traditional methods.",
    image: { src: "https://placehold.co/400x400.png", hint: "professional man" }
  },
  {
    name: "Priya Singh",
    role: "Clinic Manager & Wellness Counselor",
    bio: "Priya ensures a smooth clinic experience and provides counseling on diet and lifestyle for holistic well-being.",
    image: { src: "https://placehold.co/400x400.png", hint: "smiling woman" }
  }
]

export function Team() {
  return (
    <section id="team" className="bg-secondary">
      <div className="container py-16 md:py-24 text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">
          Meet Our Dedicated Team
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Our practitioners are committed to your health and wellness journey.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="aspect-square">
                <Image
                  src={member.image.src}
                  alt={`Photo of ${member.name}`}
                  data-ai-hint={member.image.hint}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6 text-left">
                <h3 className="font-headline text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-semibold">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
