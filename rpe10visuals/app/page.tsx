'use client'
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import HeroSlider from "@/components/HeroSlider"
import PackagesSection from "@/components/PackagesSection"
import AboutSection from "@/components/AboutSection"
import FAQSection from "@/components/FAQSection"
import ContactSection from "@/components/ContactSection"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  return (
    <main className="min-h-screen relative">
      <div className="relative">
        <Navbar />
        <HeroSlider />
        <PackagesSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </div>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] backdrop-blur-xl bg-black/30 flex items-center justify-center px-6"
          >
            <motion.div
              key="intro-card"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="max-w-xl w-full h-auto rounded-3xl bg-gray-100/90 text-black shadow-2xl border border-white/20 p-10"
            >
              <div className="flex flex-col items-center text-center gap-6">
                <h1 className="display uppercase text-4xl font-bold tracking-tight">RPE 10 VISUALS</h1>
                <p className="text-lg leading-relaxed text-zinc-800 max-w-lg">
                  We document suffering and triumph—the brutal honesty of effort when weight meets will.
                  This isn&apos;t just content; it&apos;s a record of pressure, grit, and what it takes
                  to bring your best when it matters.
                </p>
                <button
                  onClick={() => setShowIntro(false)}
                  className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-black text-white text-base font-semibold hover:bg-black/90"
                >
                  PROCEED
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
