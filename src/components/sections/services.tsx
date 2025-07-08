import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, ShieldCheck, Bone, Brain, Zap, Baby } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const services = [
  {
    icon: Stethoscope,
    title: "Chronic Disease Management",
    description: "Holistic care for long-term conditions like diabetes, arthritis, and hypertension, focusing on improving quality of life."
  },
  {
    icon: ShieldCheck,
    title: "Allergy & Asthma Treatment",
    description: "Natural remedies to manage and reduce allergic reactions and respiratory issues, strengthening your immune system."
  },
  {
    icon: Bone,
    title: "Skin & Hair Disorders",
    description: "Effective treatment for eczema, psoriasis, acne, and hair fall, addressing the root cause for lasting results."
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    description: "Support for anxiety, depression, and stress-related disorders through gentle, non-addictive homeopathic solutions."
  },
  {
    icon: Zap,
    title: "Pain Management",
    description: "Relief from joint pain, migraines, and other chronic pain conditions without the side effects of conventional medicine."
  },
  {
    icon: Baby,
    title: "Pediatric & Women's Health",
    description: "Specialized care for children's common ailments and women's health issues, from infancy to menopause."
  }
]

interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
}

const ServiceCard = ({ service }: { service: Service }) => (
    <Card className="text-center h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card">
        <CardHeader className="items-center">
            <div className="p-4 bg-primary/20 rounded-full inline-block">
                <service.icon className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-xl pt-4">{service.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-muted-foreground">{service.description}</p>
        </CardContent>
    </Card>
)

export function Services() {
  return (
    <section id="services" className="bg-background">
      <div className="container py-16 md:py-24 text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">
          Our Homeopathic Services
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We offer a wide range of treatments to address your health concerns naturally.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>
      </div>
    </section>
  )
}
