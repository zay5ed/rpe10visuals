'use client'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { EVENTS } from '@/lib/data'

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  const n = EVENTS.length
  const active = EVENTS[currentIndex]
  const next1 = EVENTS[(currentIndex + 1) % n]
  const next2 = EVENTS[(currentIndex + 2) % n]

  const paginate = useMemo(
    () =>
      (dir: 1 | -1) => {
        setCurrentIndex((i) => (i + dir + n) % n)
      },
    [n]
  )

  useEffect(() => {
    const defaultDelay = active.isActive ? 15000 : 8000
    const t = setInterval(() => {
      paginate(1)
    }, defaultDelay)
    return () => clearInterval(t)
  }, [paginate, active.isActive])

  const spread = useMemo(
    () => [
      { x: 0, scale: 1, z: 30, opacity: 1, rotate: 0 },
      { x: 120, scale: 0.9, z: 20, opacity: 0.95, rotate: 5 },
      { x: 220, scale: 0.8, z: 10, opacity: 0.9, rotate: 10 }
    ],
    []
  )

  return (
    <section className="relative h-screen flex items-center justify-center touch-pan-y pb-20">
      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="hidden lg:block w-[28rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.65 }}
                className="text-left"
              >
                <h3 className="text-4xl font-bold display mb-3">{active.name}</h3>
                <p className="text-white/70 mb-2">{active.date}</p>
                <p className="text-white/70 leading-7">{active.desc}</p>
                <p className="text-white/60 mt-2">{active.location}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-[60vh] min-h-[420px] sm:h-[64vh] md:h-[72vh] md:min-h-[520px] flex items-center justify-center">
            <div className="relative w-[14rem] sm:w-[16rem] md:w-[18rem] aspect-[9/16]">
              <div className="absolute inset-0" style={{ zIndex: spread[2].z }}>
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10"
                  style={{ transform: `translateX(${spread[2].x}px) scale(${spread[2].scale}) rotate(${spread[2].rotate}deg)`, opacity: spread[2].opacity }}
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${next2.image})` }}
                  />
                </div>
              </div>
              <div className="absolute inset-0" style={{ zIndex: spread[1].z }}>
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10"
                  style={{ transform: `translateX(${spread[1].x}px) scale(${spread[1].scale}) rotate(${spread[1].rotate}deg)`, opacity: spread[1].opacity }}
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${next1.image})` }}
                  />
                </div>
              </div>
              <div className="absolute inset-0" style={{ zIndex: spread[0].z }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_32px_rgba(255,255,255,0.08)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {active.isActive ? (
                      <div
                        onClick={() => router.push(`/competition/${active.id}`)}
                        className="block h-full w-full cursor-pointer relative group"
                      >
                        <div
                          className="h-full w-full bg-cover bg-center transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
                          style={{ backgroundImage: `url(${active.image})` }}
                        />
                        <div className="absolute inset-x-0 bottom-16 flex justify-center opacity-100 transition-opacity duration-300 pointer-events-none">
                          <button className="px-5 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium text-sm pointer-events-auto">
                            Explore Packages
                          </button>
                        </div>
                      </div>
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
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 hidden lg:block">
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

          <div className="w-full px-2 lg:hidden mt-4 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + '-m'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
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
                <h3 className="text-3xl font-bold display mb-2">{active.name}</h3>
                <p className="text-white/70 mb-2">{active.date}</p>
                <p className="text-white/70 leading-7">{active.desc}</p>
                <p className="text-white/60 mt-2">{active.location}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
