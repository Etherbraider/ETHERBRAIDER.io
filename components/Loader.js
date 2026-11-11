'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'

const word = [...'ETHER BRAIDER']
const status = n => (n < 35 ? 'linking strands…' : n < 75 ? 'reading chain head…' : 'ready')

// Once per tab session. The counter writes straight to the DOM (no React re-renders while the page
// hydrates), every animation is CSS, and the loader leaves only after the window "load" event (max 4 s).
export default function Loader() {
  const [phase, setPhase] = useState('run')
  const num = useRef()
  const txt = useRef()
  const bar = useRef()
  const lenis = useLenis()

  useEffect(() => {
    try { if (sessionStorage.eb) return setPhase('done') } catch {}
    history.scrollRestoration = 'manual'
    scrollTo(0, 0)
    const loaded = new Promise(r => (document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true })))
    const ready = Promise.race([loaded, new Promise(r => setTimeout(r, 4000))])
    const t0 = performance.now()
    let raf, live = true
    const tick = now => {
      const n = Math.min(100, Math.round((now - t0) / 16))
      num.current.textContent = String(n).padStart(3, '0')
      txt.current.textContent = status(n)
      bar.current.style.transform = `scaleX(${n / 100})`
      if (n < 100) raf = requestAnimationFrame(tick)
      else ready.then(() => live && setTimeout(() => live && setPhase('out'), 250))
    }
    raf = requestAnimationFrame(tick)
    return () => { live = false; cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    if (phase === 'run') { lenis?.stop(); return }
    document.documentElement.dataset.ready = ''
    lenis?.start()
    if (phase !== 'out') return
    try { sessionStorage.eb = 1 } catch {}
    const t = setTimeout(() => setPhase('done'), 600)
    return () => clearTimeout(t)
  }, [phase, lenis])

  if (phase === 'done') return null
  return (
    <div role="status" aria-label="Loading" className={`loader fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-bg transition-opacity duration-500 ${phase === 'out' ? 'opacity-0' : ''}`}>
      <svg aria-hidden viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" className="absolute inset-0 size-full stroke-dim">
        <ellipse cx="720" cy="560" rx="520" ry="150" strokeOpacity=".22" strokeDasharray="4 8" className="animate-orbit" />
        <ellipse cx="720" cy="560" rx="380" ry="105" strokeOpacity=".28" strokeDasharray="3 9" className="animate-orbit [animation-direction:reverse]" />
        <ellipse cx="720" cy="560" rx="230" ry="62" strokeOpacity=".35" />
      </svg>
      <div className="relative flex flex-col items-center gap-10">
        <Image src="/eb-mark.webp" alt="" width={220} height={279} priority unoptimized className="w-[min(220px,45vw)] animate-bob" />
        <p className="flex font-display text-[15px] tracking-[.2em]">
          {word.map((c, i) => (
            <span key={i} style={{ animationDelay: `${0.3 + i * 0.05}s` }} className={`animate-rise ${i < 5 ? 'text-red' : ''}`}>{c === ' ' ? ' ' : c}</span>
          ))}
        </p>
        <span ref={txt} className="font-mono text-[10px] text-mute">linking strands…</span>
      </div>
      <span ref={num} className="absolute bottom-8 right-6 font-display text-[22px] sm:right-10">000</span>
      <span ref={bar} className="absolute inset-x-0 bottom-0 h-px origin-left bg-red shadow-[0_0_10px_var(--color-red)]" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
