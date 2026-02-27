'use client'
import { Instagram, Twitter, Youtube } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl">
        <h2 className="text-5xl font-bold display mb-10 text-center">CONTACT US</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <p className="text-white/80">rpe10visuals@gmail.com</p>
            <p className="text-white/80">+91 6366 031466</p>
            <p className="text-white/80">Copyrights registered</p>
          </div>
          <div className="flex items-center justify-center gap-6">
            <a href="#" aria-label="Instagram" className="h-14 w-14 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40">
              <Instagram />
            </a>
            <a href="#" aria-label="Twitter" className="h-14 w-14 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40">
              <Twitter />
            </a>
            <a href="#" aria-label="YouTube" className="h-14 w-14 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40">
              <Youtube />
            </a>
          </div>
          <div>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl bg-black/30 backdrop-blur-md border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <textarea
                placeholder="Your suggestion"
                rows={5}
                className="w-full rounded-xl bg-black/30 backdrop-blur-md border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
