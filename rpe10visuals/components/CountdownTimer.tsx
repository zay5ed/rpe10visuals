'use client'
import { useState, useEffect } from 'react'
import { useIsMounted } from '@/lib/useIsMounted'

export default function CountdownTimer() {
  const isMounted = useIsMounted()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // 2026-03-21T20:00:00 (Saturday, March 21, 2026 8:00 PM)
    const target = new Date('2026-03-21T20:00:00')

    const interval = setInterval(() => {
      const difference = target.getTime() - new Date().getTime()
      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isMounted) return null

  return (
    <div className="flex flex-col items-center justify-center bg-black/40 border border-[#BEA1F7]/30 rounded-2xl p-4 mb-4 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#BEA1F7] to-transparent opacity-50"></div>
      <div className="text-sm sm:text-lg font-bold text-[#BEA1F7] mb-2 tracking-widest text-center uppercase animate-pulse">
        15% OFF SITEWIDE ON PREORDERS
      </div>
      <div className="text-white/80 font-mono text-base sm:text-lg flex items-center gap-2">
        <span>Ends in:</span>
        <span className="font-bold text-white tracking-widest">
          {String(timeLeft.days).padStart(2, '0')}:
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
