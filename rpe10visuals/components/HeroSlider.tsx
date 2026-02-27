'use client'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { EVENTS } from '@/lib/data'

// removed unused local type

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const n = EVENTS.length
  const SPRING = { type: 'spring', stiffness: 300, damping: 30 } as const
  const paginate = useMemo(
    () =>
      (dir: 1 | -1) => {
        setDirection(dir)
        setCurrentIndex((i) => (i + dir + n) % n)
      },
    [n]
  )

  useEffect(() => {
    const t = setInterval(() => {
      paginate(1)
    }, 7000)
    return () => clearInterval(t)
  }, [paginate])

  const active = EVENTS[currentIndex]
  const next1 = EVENTS[(currentIndex + 1) % n]
  const next2 = EVENTS[(currentIndex + 2) % n]

  const swipeThreshold = 80

  const spread = useMemo(
    () => [
      { x: 0, scale: 1, z: 30, opacity: 1, rotate: 0 },
      { x: 120, scale: 0.9, z: 20, opacity: 0.95, rotate: 5 },
      { x: 220, scale: 0.8, z: 10, opacity: 0.9, rotate: 10 }
    ],
    []
  )

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="hidden lg:block w-[28rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-left"
              >
                <h3 className="text-4xl font-bold display mb-3">{active.name}</h3>
                <p className="text-white/70 mb-2">{active.date}</p>
                <p className="text-white/70 leading-7">{active.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-[72vh] min-h-[520px] flex items-center justify-center">
            <div className="relative w-[14rem] sm:w-[16rem] md:w-[18rem] aspect-[9/16]">
              <div className="absolute inset-0" style={{ zIndex: spread[2].z }}>
                <motion.div
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10"
                  animate={{ x: spread[2].x, scale: spread[2].scale, opacity: spread[2].opacity, rotate: spread[2].rotate }}
                  transition={SPRING}
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${next2.image})` }}
                  />
                </motion.div>
              </div>
              <div className="absolute inset-0" style={{ zIndex: spread[1].z }}>
                <motion.div
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10"
                  animate={{ x: spread[1].x, scale: spread[1].scale, opacity: spread[1].opacity, rotate: spread[1].rotate }}
                  transition={SPRING}
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${next1.image})` }}
                  />
                </motion.div>
              </div>
              <div className="absolute inset-0" style={{ zIndex: spread[0].z }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_32px_rgba(255,255,255,0.08)]"
                    initial={{ x: direction === 1 ? 60 : -60, opacity: 0, scale: 0.98 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: direction === 1 ? -80 : 80, opacity: 0, scale: 0.98 }}
                    transition={SPRING}
                    drag="x"
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -swipeThreshold) paginate(1)
                      else if (info.offset.x > swipeThreshold) paginate(-1)
                    }}
                  >
                    {active.isActive ? (
                      <Link href={`/competition/${active.id}`} className="block h-full w-full cursor-pointer">
                        <div
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${active.image})` }}
                        />
                      </Link>
                    ) : (
                      <div
                        className="h-full w-full bg-cover bg-center cursor-default"
                        style={{ backgroundImage: `url(${active.image})` }}
                      />
                    )}
                    <button
                      aria-label="Previous"
                      onClick={(e) => {
                        e.stopPropagation()
                        paginate(-1)
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      aria-label="Next"
                      onClick={(e) => {
                        e.stopPropagation()
                        paginate(1)
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex items-center justify-center gap-2">
                {active.isActive ? (
                  <>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_16px_#22c55e]" />
                    <span className="text-[#22c55e] text-xs tracking-wide font-semibold">ACTIVE</span>
                  </>
                ) : (
                  <>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444] animate-pulse shadow-[0_0_16px_#ef4444]" />
                    <span className="text-[#ef4444] text-xs tracking-wide font-semibold">UPCOMING</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full px-2 lg:hidden mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + '-m'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h3 className="text-3xl font-bold display mb-2">{active.name}</h3>
                <p className="text-white/70 mb-2">{active.date}</p>
                <p className="text-white/70 leading-7">{active.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
