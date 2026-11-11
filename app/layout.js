import { Audiowide, Exo_2, JetBrains_Mono } from 'next/font/google'
import Shell from '../components/Shell'
import './globals.css'

const display = Audiowide({ weight: '400', subsets: ['latin'], variable: '--font-audiowide' })
const sans = Exo_2({ subsets: ['latin'], variable: '--font-exo' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jet' })

export const metadata = {
  title: 'Ether Braider · Web3 security',
  description: 'We secure stablecoins and tokenized assets after the audit, while they live on-chain.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Repeat visit in this tab: skip the loader before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: "try{sessionStorage.eb&&document.documentElement.setAttribute('data-seen','')}catch(e){}" }} />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
