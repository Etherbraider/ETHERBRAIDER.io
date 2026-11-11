'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import { motion, useSpring } from 'motion/react'

export default function HeroArt() {
  const x = useSpring(0, { stiffness: 60, damping: 20 })
  const y = useSpring(0, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const move = e => {
      x.set((e.clientX / innerWidth - 0.5) * -24)
      y.set((e.clientY / innerHeight - 0.5) * -16)
    }
    addEventListener('pointermove', move)
    return () => removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, delay: 0.3 }}
      className="pointer-events-none absolute inset-x-0 top-2.5 flex justify-center"
    >
      <Image src="/eb-hero.webp" alt="" width={1245} height={894} priority unoptimized className="w-[1180px] max-w-full [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_72%)]" />
    </motion.div>
  )
}
