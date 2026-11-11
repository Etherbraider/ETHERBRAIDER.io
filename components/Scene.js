'use client'
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Color } from 'three'

const red = new Color('#ea3b36')
const green = new Color('#34d399')

// Particle orbit field behind the page. Turns green while the BraiderShield section is on screen.
function Field({ count }) {
  const ref = useRef()
  const target = useRef(red)
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < p.length; i += 3) {
      const a = Math.random() * Math.PI * 2
      const r = 3 + Math.random() * 9
      p.set([Math.cos(a) * r, (Math.random() - 0.5) * 2.4, Math.sin(a) * r], i)
    }
    return p
  }, [count])

  useEffect(() => {
    const el = document.getElementById('product')
    const io = new IntersectionObserver(([e]) => (target.current = e.isIntersecting ? green : red), { threshold: 0.4 })
    if (el) io.observe(el)
    return () => io.disconnect()
  }, [])

  useFrame(({ clock, pointer }) => {
    const m = ref.current
    m.rotation.y = clock.elapsedTime * 0.03 + pointer.x * 0.15
    m.rotation.x = 0.35 + pointer.y * 0.08
    m.material.color.lerp(target.current, 0.04)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={red} size={0.03} transparent opacity={0.55} depthWrite={false} />
    </points>
  )
}

export default function Scene() {
  const count = innerWidth < 768 ? 600 : 1400
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 animate-[fade_1.2s_both]">
      <Canvas camera={{ position: [0, 2, 9], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'low-power' }} frameloop={matchMedia('(prefers-reduced-motion: reduce)').matches ? 'demand' : 'always'}>
        <Field count={count} />
      </Canvas>
    </div>
  )
}
