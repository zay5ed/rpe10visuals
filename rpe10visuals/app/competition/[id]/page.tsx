'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { EVENTS } from '@/lib/data'
import Navbar from '@/components/Navbar'
import { useIsMounted } from '@/lib/useIsMounted'

type PackageOption = {
  key: 'p1' | 'p2' | 'p3'
  name: string
  price: number
}

const PACKAGES: PackageOption[] = [
  { key: 'p1', name: 'Photo Package', price: 1500 },
  { key: 'p2', name: 'Video Package', price: 2000 },
  { key: 'p3', name: 'Hype Package', price: 3500 },
]

const SPRING = { type: 'spring', stiffness: 300, damping: 30 } as const

export default function CompetitionPage() {
  const { id } = useParams<{ id: string }>()
  const event = EVENTS.find((e) => e.id === String(id)) ?? EVENTS[0]
  const compName = event.name
  const { addToCart } = useCart()
  const [selected, setSelected] = useState<PackageOption | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const isMounted = useIsMounted()

  function handleAdd() {
    if (!selected) return
    addToCart({
      id: `${id}-${selected.key}-${Date.now()}`,
      compName,
      packageName: selected.name,
      price: selected.price,
      image: event.image
    })
    setToastOpen(true)
    setTimeout(() => setToastOpen(false), 3000)
  }

  if (!isMounted) return null
  return (
    <main className="px-6 py-12 pt-32">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <div className="aspect-[9/16] w-full max-w-md rounded-3xl overflow-hidden border border-white/10 mx-auto">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${event.image})` }}
            />
          </div>
        </div>
        <div className="mt-12">
          <h1 className="display uppercase text-4xl font-bold mb-3">{compName}</h1>
          <h2 className="text-white/80 mb-6 uppercase">Select a Package</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {PACKAGES.map((pkg) => {
              const active = selected?.key === pkg.key
              return (
                <button
                  key={pkg.key}
                  onClick={() => setSelected(pkg)}
                  className={`rounded-2xl px-5 py-7 min-h-[320px] text-left border flex flex-col justify-between ${active ? 'border-white bg-white text-black' : 'border-white bg-transparent text-white'} transition-colors`}
                >
                  <div className="text-lg font-semibold">{pkg.name} (₹{pkg.price})</div>
                  <ul className={`mt-3 space-y-2 ${active ? 'text-black/80' : 'text-white/70'}`}>
                    {pkg.key === 'p1' && (
                      <>
                        <li>• 12 High-Res Pictures</li>
                        <li>• Assortment of all lifts</li>
                        <li>• 3-day delivery</li>
                        <li>• Professional color grading</li>
                      </>
                    )}
                    {pkg.key === 'p2' && (
                      <>
                        <li>• 4k Resolution</li>
                        <li>• All 3 attempts</li>
                        <li>• 5-day delivery</li>
                        <li>• Exported for social media</li>
                      </>
                    )}
                    {pkg.key === 'p3' && (
                      <>
                        <li>• 30-60sec cinematic edit</li>
                        <li>• Custom song sync</li>
                        <li>• 10-day delivery</li>
                        <li>• 2 Revisions included</li>
                      </>
                    )}
                  </ul>
                </button>
              )
            })}
          </div>
          <div className="mt-6">
            <button
              onClick={handleAdd}
              disabled={!selected}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/20 ${selected ? 'bg-white text-black hover:bg-white/90' : 'opacity-50 cursor-not-allowed bg-white/5 text-white/70'}`}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* Details section removed per new wireframe */}

      <AnimatePresence>
        {toastOpen && selected && (
          <motion.div
            initial={{ opacity: 0, x: 80, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 80, y: -20 }}
            transition={SPRING}
            className="fixed top-6 right-6 z-[70] rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 p-4 flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-md overflow-hidden border border-white/10">
              <img src={event.image} alt="Event" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-semibold">Added to Cart</div>
              <div className="text-white/70 text-sm">{selected.name} • ₹{selected.price}</div>
            </div>
            <Link href="/cart" className="ml-4 text-sm underline">
              VIEW CART
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
