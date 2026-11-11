'use client'
import { useEffect, useState } from 'react'

const RPC = 'https://ethereum-rpc.publicnode.com'
const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_blockNumber', params: [] })

// Live Ethereum mainnet block number, refreshed every block (~12 s).
export default function Block() {
  const [n, setN] = useState()
  useEffect(() => {
    const get = () =>
      fetch(RPC, { method: 'POST', headers: { 'content-type': 'application/json' }, body })
        .then(r => r.json())
        .then(r => setN(parseInt(r.result, 16)))
        .catch(() => {})
    get()
    const t = setInterval(get, 12000)
    return () => clearInterval(t)
  }, [])
  return <span className="font-mono">{n ? n.toLocaleString('en-US') : '—'}</span>
}
