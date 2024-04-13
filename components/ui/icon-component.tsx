import { weatherIconMappings } from "@/lib/iconMap"
import Image from "next/image"

interface IconComponentProps {
  weatherCode: any
  icon?: any
  className?: string
}

export default function IconComponent({
  weatherCode,
  icon,
  className,
}: IconComponentProps) {
  // const iconNameKey = x ? `${weatherCode}${x}` : weatherCode
  // const iconName = weatherIconMappings[iconNameKey]

  return (
    <div className={`relative invert-0 dark:invert ${className}`}>
      <Image
        fill
        alt={weatherCode}
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        className="select-none"
      />
    </div>
  )
}
