import { Fragment } from 'react'
import Image from 'next/image'
import * as motion from 'motion/react-client'
import HeroArt from '../components/HeroArt'
import Block from '../components/Block'
import Portal from '../components/Portal'
import LeadForm from '../components/LeadForm'

const SHIELD = process.env.NEXT_PUBLIC_SHIELD_URL ?? 'http://localhost:3001'
const wrap = 'mx-auto flex max-w-[1360px] flex-wrap gap-x-20 gap-y-10 px-6 sm:px-10'
const rise = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } }

function Label({ n, children, className = 'basis-[200px] text-red' }) {
  return (
    <motion.span
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className={`shrink-0 font-mono text-[10px] tracking-[.12em] ${className}`}
    >
      [ {n} ] {children}
    </motion.span>
  )
}

const facts = [
  ['FOCUS', 'Stablecoins · RWA · DeFi'],
  ['PRODUCT', <Portal key="p" href={SHIELD} color="#fff" className="link text-mint">BraiderShield</Portal>],
  ['CHAIN', 'Ethereum + EVM'],
  ['BLOCK', <Block key="b" />],
]

const does = [
  ['Read', 'Every owner, role, signer, upgrade, mint, oracle update and treasury move, block by block.'],
  ['Reason', 'Single events become one story: access, control, persistence, extraction.'],
  ['Respond', 'One clear message with the dollars at risk and the next three steps.'],
]

// six surfaces placed around the ring (desktop); a plain list below lg
const expertise = [
  ['Keys & signers', 'Hot keys, multisig thresholds, new signers, EIP-7702 delegation.', 'lg:left-[calc(50%-110px)] lg:top-0 lg:items-center lg:text-center'],
  ['Roles & access', 'Admins, minters, pausers, role grants nobody planned.', 'lg:left-[calc(50%+230px)] lg:top-[140px]'],
  ['Upgrades', 'Proxy implementations and admins that change quietly.', 'lg:left-[calc(50%+230px)] lg:top-[400px]'],
  ['Oracles & NAV', 'Price jumps, stale or future-dated reports, feed swaps.', 'lg:left-[calc(50%-110px)] lg:top-[572px] lg:items-center lg:text-center'],
  ['Mint & reserves', 'Unbacked supply, minter allowances, proof of reserve.', 'lg:left-[calc(50%-450px)] lg:top-[400px] lg:items-end lg:text-right'],
  ['Treasury flows', 'Outflows, drains over hours, share of treasury moved.', 'lg:left-[calc(50%-450px)] lg:top-[140px] lg:items-end lg:text-right'],
]
const ring = [[450, 90], [649, 205], [649, 435], [450, 550], [251, 435], [251, 205]]

// sparkline: flat noise, then a climb from `at` (the attack), dot where it was flagged
const spark = (seed, at) =>
  Array.from({ length: 21 }, (_, i) => {
    seed = (seed * 9301 + 49297) % 233280
    return `${i * 10},${Math.max(4, i >= at ? 30 - (i - at + 1) * 5.5 : 30 - (seed / 233280) * 8).toFixed(1)}`
  }).join(' ')

const proof = [
  ['Resolv', 'MAR 2026 · ~$80M UNBACKED', 'Single-key role minted unbacked USR; peg gone in 17 minutes.', '→ flagged at stage 2 of 4', spark(3, 13)],
  ['StablR', 'MAY 2026 · ~$13.5M UNBACKED', 'One multisig signer compromised, threshold dropped, mint followed.', '→ flagged at stage 1 of 4', spark(7, 9)],
  ['Ostium', 'JUL 2026 · ~$18M DRAINED', 'Future-dated oracle price, vault redeemed against it.', '→ flagged before the drain', spark(11, 15)],
]

const converge = Array.from({ length: 22 }, (_, i) => `M1440 ${20 + i * 28} C1100 ${20 + i * 28} 1000 310 760 310`)

export default function Home() {
  return (
    <main>
      <section id="top" className="relative flex min-h-svh flex-col overflow-hidden">
        <HeroArt />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-96 bg-linear-to-b from-transparent via-bg/85 to-bg" />

        <header className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-wrap items-center justify-between gap-4 px-6 py-7 sm:px-10">
          <a href="#top" className="flex items-center gap-3 font-display text-sm uppercase tracking-[.16em]">
            <span><span className="text-red">Ether</span> Braider</span>
          </a>
          <span className="font-mono text-[10px] tracking-widest text-mute max-md:hidden">WEB3 SECURITY · EST. 2026</span>
          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-[11px] font-medium uppercase tracking-[.24em]">
            <a href="#expertise" className="link">Expertise</a>
            <Portal href={SHIELD} color="#fff" className="link text-mint">BraiderShield</Portal>
            <a href="#contact" className="link">Contact</a>
          </nav>
        </header>

        <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[1360px] flex-wrap items-end justify-between gap-x-20 gap-y-10 px-6 pb-12 sm:px-10">
          <motion.div {...rise} className="flex max-w-[640px] flex-col gap-4">
            <Label n="00" className="text-red">WHO WE ARE</Label>
            <h1 className="text-[clamp(26px,5vw,34px)] font-extralight leading-[1.3] text-white">
              We secure stablecoins and tokenized assets after the audit, while they live on-chain.
            </h1>
            <p className="max-w-[520px] leading-[1.8] text-dim">
              Ether Braider is a web3 security company. We read every privileged change on your contracts, connect the dots into an attack chain, and tell your team in plain words when something is going wrong.
            </p>
          </motion.div>
          <dl className="grid grid-cols-[auto_auto] gap-x-6 gap-y-2.5 text-[11px] tracking-[.06em]">
            {facts.map(([k, v]) => (
              <Fragment key={k}>
                <dt className="font-mono text-[10px] text-mute">{k}</dt>
                <dd>{v}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </section>

      <section className={`${wrap} py-40`}>
        <Label n="01">WHAT WE DO</Label>
        <div className="flex flex-1 basis-[640px] flex-col gap-16">
          <motion.p {...rise} className="max-w-[860px] text-[clamp(22px,4.5vw,30px)] font-extralight leading-[1.45] text-white">
            Most losses in 2026 did not come from bad code. They came from a stolen key, a new minter, a quiet upgrade or a fake price. <span className="text-mute">That is the layer we cover.</span>
          </motion.p>
          <div className="flex flex-wrap gap-x-16 gap-y-10">
            {does.map(([verb, body], i) => (
              <motion.div key={verb} {...rise} transition={{ ...rise.transition, delay: i * 0.1 }} className="flex max-w-[280px] flex-[1_1_220px] flex-col gap-2.5">
                <span className="font-display text-[13px] uppercase tracking-[.14em] text-white">{verb}</span>
                <span className="h-px w-4.5 bg-red" />
                <span className="leading-[1.75] text-dim">{body}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="border-y border-line">
        <div className={`${wrap} py-36`}>
          <div className="flex shrink-0 basis-[200px] flex-col gap-3.5">
            <Label n="02" className="text-red">EXPERTISE</Label>
            <span className="text-xs leading-[1.7] text-mute">Six attack surfaces we know in depth, mapped from real 2026 incidents.</span>
          </div>
          <div className="relative flex flex-1 basis-[760px] flex-col gap-7 lg:h-[640px]">
            <svg aria-hidden viewBox="0 0 900 640" className="absolute inset-0 size-full max-lg:hidden" fill="none">
              <circle cx="450" cy="320" r="230" stroke="#20272b" />
              <circle cx="450" cy="320" r="150" stroke="#161c20" strokeDasharray="2 6" />
              <motion.path d="M450 90 A230 230 0 0 1 649 205" stroke="#ea3b36" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
              {ring.map(([x, y], i) => (
                <g key={i}>
                  <line x1="450" y1="320" x2={x} y2={y} stroke="#2a3236" />
                  <circle cx={x} cy={y} r="4" fill={i ? '#080c0f' : '#ea3b36'} stroke={i ? '#7b858a' : '#ea3b36'} />
                </g>
              ))}
            </svg>
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 max-lg:hidden">
              <Image src="/eb-mark.webp" alt="" width={84} height={106} />
              <span className="font-display text-xs tracking-[.18em]"><span className="text-red">ETHER</span> BRAIDER</span>
            </div>
            {expertise.map(([name, body, pos], i) => (
              <motion.div key={name} {...rise} transition={{ ...rise.transition, delay: i * 0.08 }} className={`group flex w-[220px] flex-col gap-1.5 lg:absolute ${pos}`}>
                <span className={`font-mono text-[10px] ${i ? 'text-mute' : 'text-red'}`}>0{i + 1}</span>
                <span className="text-xs font-semibold uppercase tracking-[.18em] text-white transition-colors group-hover:text-red">{name}</span>
                <span className="text-xs leading-[1.6] text-mute">{body}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="relative overflow-hidden">
        <svg aria-hidden viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" fill="none" stroke="#10b981">
          {[90, 170, 260, 360].map((r, i) => <circle key={r} cx="1080" cy="320" r={r} strokeOpacity={0.35 - i * 0.09} strokeDasharray={i === 2 ? '3 7' : undefined} />)}
          <line x1="1080" y1="320" x2="1300" y2="190" strokeOpacity=".5" className="origin-[1080px_320px] animate-sweep" />
        </svg>
        <div className={`${wrap} relative items-center py-40`}>
          <Label n="03" className="basis-[200px] self-start text-mint">OUR PRODUCT</Label>
          <motion.div {...rise} className="flex max-w-[560px] flex-1 basis-[520px] flex-col gap-6">
            <div className="flex items-center gap-4.5">
              <Image src="/bs-knot.webp" alt="BraiderShield logo" width={58} height={72} />
              <div className="flex flex-col gap-1.5">
                <span className="font-display text-2xl uppercase tracking-[.08em]">Braider<span className="text-mint">Shield</span></span>
                <span className="flex items-center gap-2.5 text-[9px] font-medium uppercase tracking-[.34em] text-mute"><span className="h-px w-5.5 bg-mute" />by Ether Braider</span>
              </div>
            </div>
            <p className="text-[26px] font-extralight leading-[1.45] text-white">The security intelligence layer for stablecoins and tokenized assets.</p>
            <p className="leading-[1.8] text-dim">Nine intelligence layers, an attack chain that shows which stage an attacker is in, and a risk score with the dollars at stake. One message to your team, with what to do next.</p>
            <span className="font-mono text-[10px] tracking-[.3em] text-mute">READ · REASON · RESPOND</span>
            <Portal href={SHIELD} color="#fff" className="self-start border-b border-mint pb-2 text-[11px] font-semibold uppercase tracking-[.28em] text-mint">Enter BraiderShield →</Portal>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className={`${wrap} py-36`}>
          <div className="flex shrink-0 basis-[200px] flex-col gap-3.5">
            <Label n="04" className="text-red">PROOF</Label>
            <span className="text-xs leading-[1.7] text-mute">Real 2026 exploits, rebuilt on testnet with production-grade contracts, replayed against our stack.</span>
          </div>
          <div className="flex flex-1 basis-[760px] flex-wrap gap-x-16 gap-y-12">
            {proof.map(([name, meta, what, caught, pts], i) => (
              <motion.div key={name} {...rise} transition={{ ...rise.transition, delay: i * 0.1 }} className="flex flex-[1_1_200px] flex-col gap-3">
                <svg aria-hidden viewBox="0 0 200 40" className="h-10 w-full max-w-[220px]" fill="none">
                  <motion.polyline points={pts} stroke="#343c41" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
                </svg>
                <span className="font-display text-lg uppercase tracking-widest">{name}</span>
                <span className="font-mono text-[10px] text-mute">{meta}</span>
                <span className="text-xs leading-[1.7] text-dim">{what}</span>
                <span className="font-mono text-[10px] text-red">{caught}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden border-t border-line">
        <svg aria-hidden viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" fill="none">
          {converge.map((d, i) => (
            <motion.path key={i} d={d} stroke={i === 11 ? '#ea3b36' : '#f2f4f5'} strokeOpacity={i === 11 ? 0.8 : 0.06} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: Math.abs(11 - i) * 0.03 }} />
          ))}
        </svg>
        <div className={`${wrap} relative py-40`}>
          <Label n="05">CONTACT</Label>
          <motion.div {...rise} className="flex max-w-[620px] flex-1 basis-[560px] flex-col gap-8">
            <p className="text-[clamp(22px,4.5vw,30px)] font-extralight leading-[1.4] text-white">Have money on-chain? Send us a contract address and we will show you where you stand.</p>
            <LeadForm fields={[['email', 'WORK EMAIL', 'email', 'you@protocol.xyz']]} cta="Send →" />
            <span className="font-mono text-[10px] text-mute">Paid in USD · no wallet connection, ever</span>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1360px] flex-wrap justify-between gap-x-8 gap-y-3.5 px-6 py-6.5 font-mono sm:px-10 text-[10px] text-mute">
          <span><span className="font-display tracking-[.14em] text-dim"><span className="text-red">ETHER</span> BRAIDER</span> · © {new Date().getFullYear()}</span>
          <span>BraiderShield is an intelligence layer, not an audit.</span>
        </div>
      </footer>
    </main>
  )
}
