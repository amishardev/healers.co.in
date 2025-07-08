import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src="https://raw.githubusercontent.com/amishardev/Healer-s-Homoeopathy-images/main/Purple_and_White_Subtle_Gradients_LinkedIn_Banner-removebg-preview.png"
        alt="Healers Homeopathy Clinic Logo"
        width={200}
        height={50}
        className="h-10 w-auto"
        priority
      />
    </div>
  )
}
