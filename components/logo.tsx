import Image from "next/image"

export function Logo() {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20sdfm-gDlxg0zxe6wVV9o5cISteykVa4LQhz.png"
        alt="CLEO Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}
