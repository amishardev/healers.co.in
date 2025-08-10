import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, ShieldCheck, Bone, Brain, Zap, Baby, Heart, Wind, Leaf, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const services = [
  {
    icon: Brain,
    title: "Psychiatric & Neurological",
    description: "Effective treatment for psychiatric cases, psycho-somatic disorders, migraine, headaches, and sleep disorders."
  },
  {
    icon: Wind,
    title: "Respiratory & Allergy",
    description: "Care for sinusitis, nasal polyps, tonsillitis, asthma, bronchitis, and allergies like recurrent cough & cold."
  },
  {
    icon: Leaf,
    title: "Gastrointestinal & Liver",
    description: "Relief from gastritis, ulcers, IBS, piles, fissure, and management of liver diseases including cirrhosis."
  },
  {
    icon: Bone,
    title: "Skin & Hair Disorders",
    description: "Treating alopecia, hair fall, dandruff, eczema, psoriasis, vitiligo, and warts from the root cause."
  },
  {
    icon: Users,
    title: "Men's & Women's Health",
    description: "Holistic solutions for infertility, erectile dysfunction, menstrual disorders, PCOD, fibroids, and prostate issues."
  },
  {
    icon: Heart,
    title: "Systemic & Chronic Ailments",
    description: "Management of joint pains, arthritis, thyroid disorders, kidney diseases, and palliative care for cancer."
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
