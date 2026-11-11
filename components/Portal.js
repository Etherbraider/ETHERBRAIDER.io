'use client'

// Cross-site link: a circle of `color` grows from the click point, then the browser navigates.
export default function Portal({ href, color, className, children }) {
  const go = e => {
    e.preventDefault()
    const at = `${e.clientX}px ${e.clientY}px`
    const d = Object.assign(document.createElement('div'), { ariaHidden: true })
    Object.assign(d.style, { position: 'fixed', inset: 0, zIndex: 200, background: color })
    document.body.append(d)
    addEventListener('pageshow', () => d.remove(), { once: true })
    d.animate([{ clipPath: `circle(0 at ${at})` }, { clipPath: `circle(150% at ${at})` }], {
      duration: 700,
      easing: 'cubic-bezier(.7,0,.2,1)',
      fill: 'forwards',
    }).onfinish = () => (location.href = href)
  }
  return (
    <a href={href} onClick={go} className={className}>
      {children}
    </a>
  )
}
