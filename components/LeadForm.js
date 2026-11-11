'use client'
import { useState } from 'react'

// fields: [name, label, type, placeholder]
export default function LeadForm({ fields, cta }) {
  const [state, setState] = useState('idle')

  async function submit(e) {
    e.preventDefault()
    setState('sending')
    const res = await fetch('/api/lead', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))) }).catch(() => null)
    setState(res?.ok ? 'sent' : 'error')
  }

  if (state === 'sent') return <p role="status" className="text-base font-light">Thanks. We will be in touch shortly.</p>

  return (
    <form onSubmit={submit} className="flex flex-wrap items-end gap-6">
      {fields.map(([name, label, type, placeholder]) => (
        <label key={name} className="field">
          {label}
          <input name={name} type={type} placeholder={placeholder} maxLength={200} required suppressHydrationWarning />
        </label>
      ))}
      <button disabled={state === 'sending'} className="btn">
        {state === 'sending' ? 'Sending…' : cta}
      </button>
      {state === 'error' && <p role="alert" className="w-full text-xs text-red">Check the details and try again.</p>}
    </form>
  )
}
