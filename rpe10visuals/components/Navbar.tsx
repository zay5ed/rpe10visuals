'use client'
import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useIsMounted } from "@/lib/useIsMounted"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cartItems } = useCart()
  const isMounted = useIsMounted()
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto mt-4 w-[92%] rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
        <div className="flex items-center justify-between px-8 py-5">
          <Link href="/" className="text-white tracking-tight font-bold display uppercase text-4xl md:text-5xl">
            RPE10VISUALS
          </Link>
          <div className="hidden md:flex items-center gap-10 text-lg">
            <Link href="#about" className="text-white/90 hover:text-white">
              About us
            </Link>
            <Link href="#faqs" className="text-white/90 hover:text-white">
              FAQs
            </Link>
            <Link href="#contact" className="text-white/90 hover:text-white">
              Contact us
            </Link>
            <Link href="/cart" className="relative inline-flex items-center text-white/90 hover:text-white">
              <ShoppingBag />
              {isMounted && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-[#ef4444] text-white text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
          <button
            className="md:hidden inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden px-8 pb-5">
            <div className="flex flex-col gap-5 text-lg">
              <Link href="#about" className="text-white/90 hover:text-white" onClick={() => setOpen(false)}>
                About us
              </Link>
              <Link href="#faqs" className="text-white/90 hover:text-white" onClick={() => setOpen(false)}>
                FAQs
              </Link>
              <Link href="#contact" className="text-white/90 hover:text-white" onClick={() => setOpen(false)}>
                Contact us
              </Link>
              <Link href="/cart" className="text-white/90 hover:text-white" onClick={() => setOpen(false)}>
                Cart
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
