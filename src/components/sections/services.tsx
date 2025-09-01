import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, ShieldCheck, Bone, Brain, Zap, Baby, Heart, Wind, Leaf, Users, Ear, AirVent, GitCommitHorizontal, Smile, CheckCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const services = [
  {
    icon: Users,
    title: "Infertility (Male & Female)",
    points: ["PCOS/PCOD", "Uterine Fibroids"]
  },
  {
    icon: Wind,
    title: "Endocrine Disorders",
    points: ["Hypothyroidism", "Hyperthyroidism", "Goitre", "Dwarfism", "Hirsutism"]
  },
  {
    icon: Leaf,
    title: "Skin & Hair Disorders",
    points: ["Vitiligo", "Dermatitis", "Warts", "Lichen Planus", "Psoriasis", "Allergies", "Diabetic Ulcers", "Hair Fall", "Alopecia"]
  },
  {
    icon: Bone,
    title: "Osteology",
    points: ["Arthritis", "Gout", "Rheumatoid Arthritis", "Avascular Necrosis (AVN)"]
  },
  {
    icon: Brain,
    title: "Psychiatric & Neurological",
    points: ["Migraine", "IBS", "Hysteria", "Psycho-somatic disorders"]
  },
  {
    icon: Heart,
    title: "Systemic & Chronic Ailments",
    points: ["Joint Pains", "Thyroid Disorders", "Kidney Diseases", "Palliative Cancer Care"]
  },
  {
    icon: Ear,
    title: "ENT Disorders",
    points: ["Sinusitis", "Allergic Rhinitis", "CSOM", "Tinnitus"]
  },
  {
    icon: AirVent,
    title: "Respiratory Disorders",
    points: ["Bronchial Asthma", "Bronchitis", "Pneumonitis"]
  },
  {
    icon: GitCommitHorizontal,
    title: "Gastrointestinal & Liver",
    points: ["Piles", "Fissures", "Hepatitis", "Liver Cirrhosis", "Pilonidal Sinus", "Ulcers"]
  },
  {
    icon: Smile,
    title: "Mind & Mood Disorders",
    points: ["Anxiety", "MDP", "Schizophrenia", "Parkinson's", "Sleep Disorders", "Fears/Phobias", "Stammering"]
  },
  {
    icon: Zap,
    title: "Sexual Health",
    points: ["Erectile Dysfunction", "Spermatorrhoea", "Prostatitis"]
  }
]

interface Service {
    icon: LucideIcon;
    title: string;
    points: string[];
}

const ServiceCard = ({ service }: { service: Service }) => (
    <Card className="text-center h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
        <CardHeader className="items-center p-4">
            <div className="p-3 bg-primary/20 rounded-full inline-block">
                <service.icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-headline text-base md:text-lg pt-2 leading-tight">{service.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-4 pt-0 text-left">
            <ul className="space-y-1">
                {service.points.map((point, i) => (
                    <li key={i} className="flex items-start text-xs text-muted-foreground gap-2">
                        <CheckCircle className="h-3 w-3 mt-0.5 shrink-0 text-primary/70" />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
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
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>
      </div>
    </section>
  )
}
