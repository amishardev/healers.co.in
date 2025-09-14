
'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

const images = [
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.26.54%20PM%20(1).jpeg?raw=true", alt: "Healers Clinic facility", hint: "clinic facility" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.26.54%20PM.jpeg?raw=true", alt: "Healers Clinic interior", hint: "clinic interior" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.26.55%20PM.jpeg?raw=true", alt: "Healers Clinic waiting area", hint: "clinic waiting area" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.26.56%20PM.jpeg?raw=true", alt: "Healers Clinic reception", hint: "clinic reception" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.26.57%20PM.jpeg?raw=true", alt: "Healers Clinic hallway", hint: "clinic hallway" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.26.58%20PM.jpeg?raw=true", alt: "Healers Clinic exterior", hint: "clinic exterior" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.26.59%20PM.jpeg?raw=true", alt: "Healers Clinic consultation room", hint: "consultation room" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.27.00%20PM.jpeg?raw=true", alt: "Homeopathic medicine display", hint: "homeopathic medicine" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.27.02%20PM.jpeg?raw=true", alt: "Healers Clinic front desk", hint: "clinic front desk" },
  { src: "https://raw.githubusercontent.com/amishardev/Healer-s-Homoeopathy-images/refs/heads/main/WhatsApp%20Image%202025-08-11%20at%207.27.09%20PM.jpeg", alt: "Healers Clinic certificate", hint: "clinic certificate" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.27.05%20PM.jpeg?raw=true", alt: "Healers Clinic certificate", hint: "clinic certificate" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.27.07%20PM.jpeg?raw=true", alt: "Patient consultation at Healers Clinic", hint: "patient consultation" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.27.10%20PM%20(1).jpeg?raw=true", alt: "Healers Clinic award", hint: "clinic award" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.27.10%20PM.jpeg?raw=true", alt: "Healers Clinic certificate", hint: "clinic certificate" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.27.11%20PM.jpeg?raw=true", alt: "Healers Clinic achievement", hint: "clinic achievement" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.27.13%20PM.jpeg?raw=true", alt: "Healers Clinic award plaque", hint: "award plaque" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.27.14%20PM.jpeg?raw=true", alt: "Healers Clinic certification", hint: "clinic certification" },
  { src: "https://github.com/amishardev/Healer-s-Homoeopathy-images/blob/main/WhatsApp%20Image%202025-08-11%20at%207.27.15%20PM.jpeg?raw=true", alt: "Healers Clinic appreciation award", hint: "appreciation award" }
];

const GalleryImage = ({ image }: { image: typeof images[0] }) => (
    <Dialog>
        <DialogTrigger asChild>
            <div className="overflow-hidden rounded-lg cursor-pointer group aspect-square">
                <Image
                    src={image.src}
                    alt={image.alt}
                    data-ai-hint={image.hint}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                />
            </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-0">
            <Image
                src={image.src}
                alt={image.alt}
                data-ai-hint={image.hint}
                width={1200}
                height={900}
                className="object-contain w-full h-full rounded-lg"
            />
        </DialogContent>
    </Dialog>
);

export function Gallery() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    return (
        <section id="gallery" className="bg-background">
            <div className="container py-16 md:py-24">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">
                        Our Clinic Gallery
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        A glimpse into our welcoming and healing environment.
                    </p>
                </div>
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                    align: "start",
                    loop: true,
                    }}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent className="-ml-4">
                        {images.map((image, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <GalleryImage image={image} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-12" />
                    <CarouselNext className="mr-12" />
                </Carousel>
            </div>
        </section>
    );
}
