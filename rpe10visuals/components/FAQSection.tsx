'use client'
import { useState } from 'react'

type Item = { q: string; a: string }

const ITEMS: Item[] = [
  { q: 'When will I receive my media?', a: 'We work fast because we know you want to post. Photo Packages are delivered within 3 days of the meet. The 3-Lift Video Packages are sent out within 5 days, and custom Hype Edits take up to 10 days to ensure the sync and color grading are perfectly dialed in. All files are delivered via a secure high-res cloud link sent directly to your email.' },
  { q: 'How do you identify me on the platform?', a: 'When you purchase a package, the checkout form requires your full name and your Weight Class / Lot Number. On meet day, we cross-reference this data with the official roster and flight sheets to ensure our lenses are locked on you the second you hear "Bar is loaded."' },
  { q: 'Can I choose the specific song for my Hype Edit?', a: 'Absolutely. The Hype Edit package is completely tailored to your vibe. During checkout, there is a dedicated field to enter your exact song choice and the specific timestamp you want us to use for the beat drop. We’ll sync your heaviest attempts right to it.' },
  { q: 'What happens if I miss a lift or bomb out?', a: 'We document the reality of the platform—both the triumphs and the suffering. We will record your missed attempts because they are part of the story and valuable for your own form review. However, for your final Hype Edit, we typically only highlight your successful white-light lifts unless you request otherwise.' }
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
