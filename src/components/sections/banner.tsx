import Image from 'next/image'
import Link from 'next/link'

export function Banner() {
  return (
    <section className="bg-background">
      <Link href="https://dietaryguide.in/app" target="_blank" rel="noopener noreferrer">
        <div className="relative w-full aspect-[16/5] md:aspect-[16/4] overflow-hidden shadow-lg">
          <Image
            src="https://github.com/amishardev/navdhiweb/blob/main/Blue%20Gradient%20Modern%20Business%20Investments%20LinkedIn%20Banner.png?raw=true"
            alt="Healers Homeopathy Clinic Banner"
            data-ai-hint="abstract gradient"
            fill
            className="object-cover"
          />
        </div>
      </Link>
    </section>
  )
}
