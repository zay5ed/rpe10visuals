'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { EVENTS } from '@/lib/data'
import Navbar from '@/components/Navbar'
import { useIsMounted } from '@/lib/useIsMounted'
import { ArrowLeft } from 'lucide-react'

type PackageOption = {
  key: 'p1' | 'p2' | 'p3'
  name: string
  price: number
}

const PACKAGES: PackageOption[] = [
  { key: 'p1', name: 'Photo Package', price: 2000 },
  { key: 'p2', name: 'Video Package', price: 2500 },
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
  const [lastAdded, setLastAdded] = useState<PackageOption | null>(null)
  const isMounted = useIsMounted()

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('rpe10_last_competition', String(id))
      }
    } catch {}
  }, [id])

  function handleAdd() {
    if (!selected) return
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('rpe10_last_competition', String(id))
      }
    } catch {}
    setLastAdded({ ...selected })
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
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-black/30 border border-white/10 px-3 py-2 hover:bg-black/40">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <div className="aspect-[9/16] w-full max-w-md rounded-3xl overflow-hidden border border-white/10 mx-auto">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${event.image})` }}
            />
          </div>
        </div>
        <div className="mt-24">
          <h1 className="display uppercase text-5xl font-bold mb-3">{compName}</h1>
          <h2 className="text-white/80 mb-6 uppercase">Select a Package</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {PACKAGES.map((pkg) => {
              const active = selected?.key === pkg.key
              return (
                <div
                  key={pkg.key}
                  onClick={() => setSelected(pkg)}
                  className={`rounded-2xl px-5 py-7 min-h-min md:min-h-[320px] text-left border flex flex-col justify-between ${active ? 'border-white bg-white text-black' : 'border-white bg-transparent text-white'} transition-colors`}
                  role="button"
                >
                  <div className="text-xl font-bold">{pkg.name} (₹{pkg.price})</div>
                  <ul className={`mt-4 md:mt-8 space-y-2 ${active ? 'text-black/80' : 'text-white/70'}`}>
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
                  {active && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAdd()
                      }}
                      className="md:hidden w-full mt-6 bg-black text-white py-3 rounded-xl"
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-6">
            <button
              onClick={handleAdd}
              disabled={!selected}
              className={`hidden md:inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/20 ${selected ? 'bg-white text-black hover:bg-white/90' : 'opacity-50 cursor-not-allowed bg-white/5 text-white/70'}`}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* Details section removed per new wireframe */}

      <AnimatePresence>
        {toastOpen && lastAdded && (
          <motion.div
            initial={{ opacity: 0, x: 80, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 80, y: -20 }}
            transition={SPRING}
            className="fixed top-28 right-17 z-[120] rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 p-4 flex items-center gap-3"
          >
            <div className="relative h-10 w-10 rounded-md overflow-hidden border border-white/10">
              <Image src={event.image} alt="Event" fill sizes="40px" className="object-cover" />
            </div>
            <div>
              <div className="font-semibold">Added to Cart</div>
              <div className="text-white/70 text-sm">{lastAdded.name} • ₹{lastAdded.price}</div>
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
