'use client'
import { useState } from 'react'

type Item = { q: string; a: string }

const ITEMS: Item[] = [
  { q: 'Do you cover local meets and nationals?', a: 'Yes, we cover local, regional, and national events with tailored packages.' },
  { q: 'How do I book the team for an event?', a: 'Reach out via email with event details, date, and deliverable expectations.' },
  { q: 'What deliverables can I expect?', a: 'Short-form reels, photo sets, and highlight edits. Custom bundles available.' },
  { q: 'Do you travel?', a: 'We travel for select events. Travel fees depend on location and schedule.' }
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faqs" className="py-20 flex items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        <h2 className="text-5xl font-bold display mb-8 text-center">FAQs</h2>
        <div className="divide-y divide-white/10 border-t border-white/10">
          {ITEMS.map((it, idx) => {
            const expanded = open === idx
            return (
              <div key={idx} className="border-b border-white/10">
                <button
                  className="w-full flex items-center justify-between py-4 text-left"
                  onClick={() => setOpen(expanded ? null : idx)}
                >
                  <span className="text-white font-medium">{it.q}</span>
                  <span className="text-white/60">{expanded ? '−' : '+'}</span>
                </button>
                <div className={`grid transition-all duration-300 ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="pb-4 text-white/70 leading-7">{it.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
