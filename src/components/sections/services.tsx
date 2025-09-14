import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, ShieldCheck, Bone, Brain, Zap, Baby, Heart, Wind, Leaf, Users, Ear, AirVent, GitCommitHorizontal, Smile, CheckCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const OsteologyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
      {...props}
    >
        <path d="M394-80q-16-47-24-92.5t-10-86q-2-40.5-.5-74.5t4.5-58q-1 0 0 0-22-5-50.5-12.5t-61-20.5Q220-437 186-455.5T119-500l50-70q39 35 81.5 55.5t78.5 32q36 11.5 60 15l24 3.5q18 1 28.5 15t7.5 32l-4.5 33.5q-4.5 33.5-5 83.5t7.5 109q8 59 33 111h-86Zm366 0h-80v-423q0-48-25.5-87T586-649L313-772l49-67 257 117q64 29 102.5 88T760-503v423ZM540-201q9 0 17-4t13-10q6 6 14 10t16 4q17 0 28.5-11.5T640-241q0-17-11.5-28.5T600-281v-159q17 0 28.5-11.5T640-480q0-17-11.5-28.5T600-520q-8 0-16 3.5t-14 9.5q-5-6-13-9.5t-17-3.5q-17 0-28.5 11.5T500-480q0 17 11.5 28.5T540-440v159q-17 0-28.5 11.5T500-241q0 17 11.5 28.5T540-201ZM480-80q-25-52-33-111t-7.5-109q.5-50 5-83.5L449-417q3-18-7.5-32T413-464l-24-3.5q-24-3.5-60-15t-78.5-32Q208-535 169-570q39 35 81.5 55.5t78.5 32q36 11.5 60 15l24 3.5q18 1 28.5 15t7.5 32l-4.5 33.5q-4.5 33.5-5 83.5t7.5 109q8 59 33 111Z"/>
    </svg>
  );

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
    icon: OsteologyIcon,
    title: "Orthopedic Disorders",
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
    icon: React.ElementType;
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
