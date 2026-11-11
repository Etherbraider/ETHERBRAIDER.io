'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import { MotionConfig } from 'motion/react'
import Loader from './Loader'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

// The particle background (three.js) is fetched only after the loader is gone and the browser is idle.
function Background() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const html = document.documentElement
    const go = () => (window.requestIdleCallback ? requestIdleCallback(() => setOn(true), { timeout: 1500 }) : setTimeout(() => setOn(true), 300))
    if (html.hasAttribute('data-ready')) { go(); return }
    const mo = new MutationObserver(() => html.hasAttribute('data-ready') && (mo.disconnect(), go()))
    mo.observe(html, { attributes: true, attributeFilter: ['data-ready'] })
    return () => mo.disconnect()
  }, [])
  return on && <Scene />
}

export default function Shell({ children }) {
  return (
    <ReactLenis root>
      <MotionConfig reducedMotion="user">
        <Loader />
        <Background />
        {children}
      </MotionConfig>
    </ReactLenis>
  )
}
