import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

const contactDetails = [
  {
    icon: MapPin,
    title: "Address",
    value: "710, Vikas Nagar, Khyora, Kanpur, Uttar Pradesh 208024, India",
    href: "https://www.google.com/maps/search/?api=1&query=710,+Vikas+Nagar,+Khyora,+Kanpur,+Uttar+Pradesh+208024",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 987 654 3210",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    title: "Email",
    value: "healingartclinic@gmail.com",
    href: "mailto:healingartclinic@gmail.com",
  },
]

export function Contact() {
  return (
    <section id="contact" className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Get In Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We are here to help. Reach out to us with any questions or to schedule your visit.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
                {contactDetails.map((item) => (
                    <Link href={item.href} target="_blank" rel="noopener noreferrer" key={item.title} className="flex items-start gap-6 group">
                        <div className="bg-primary/20 text-primary p-4 rounded-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <item.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-muted-foreground group-hover:text-primary transition-colors">{item.value}</p>
                        </div>
                    </Link>
                ))}
            </div>
          <Card className="overflow-hidden">
            <CardContent className="p-0 h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.956557991957!2d80.28394!3d26.4561008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c375535561a3b%3A0x2863a9f029c29a8a!2s710%2C%20Vikas%20Nagar%2C%20Khyora%2C%20Kanpur%2C%20Uttar%20Pradesh%20208024!5e0!3m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[300px] md:min-h-[450px]"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
