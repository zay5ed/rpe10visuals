'use client'
import { useCart } from '@/context/CartContext'
import { ArrowLeft, Trash } from 'lucide-react'
import { useState } from 'react'
import { useIsMounted } from '@/lib/useIsMounted'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartItemData, clearCart } = useCart()
  const isMounted = useIsMounted()
  const [lastComp] = useState<string | null>(() => {
    try {
      return typeof window !== 'undefined' ? localStorage.getItem('rpe10_last_competition') : null
    } catch {
      return null
    }
  })
  const router = useRouter()

  function handleBack() {
    if (lastComp) {
      router.push(`/competition/${lastComp}`)
    } else {
      router.back()
    }
  }

  async function handleCheckout() {
    if (cartItems.length === 0) return
    const missing: string[] = []
    for (const it of cartItems) {
      const isVideo = /video/i.test(it.packageName)
      const isHype = /hype/i.test(it.packageName)
      if (!it.lifterName) missing.push(`${it.packageName}: Lifter Name`)
      if (!it.weightClass) missing.push(`${it.packageName}: Weight Class / Lot Number`)
      if (!it.phone) missing.push(`${it.packageName}: Phone Number`)
      if (!it.email) missing.push(`${it.packageName}: Email`)
      if (isVideo && !it.videoFormat) missing.push(`${it.packageName}: Video Format`)
      if (isHype && !it.songChoice) missing.push(`${it.packageName}: Song Choice & Timestamp`)
    }
    if (missing.length > 0) {
      alert(`Please complete required fields:\n\n- ${missing.join('\n- ')}`)
      return
    }
    try {
      const supabase = getSupabaseClient()
      const rows = cartItems.map((it) => ({
        created_at: new Date().toISOString(),
        event_name: it.compName,
        package_name: it.packageName,
        price: it.price,
        lifter_name: it.lifterName ?? '',
        weight_class: it.weightClass ?? '',
        phone: it.phone ?? '',
        email: it.email ?? '',
        video_format: it.videoFormat ?? null,
        song_choice: it.songChoice ?? null,
        payment_status: 'unpaid',
        razorpay_order_id: null,
      }))
      const { error } = (await supabase.from('orders').insert(rows)) as { error?: unknown }
      if (error != null) {
        console.error('Supabase insert error', error)
        alert('Failed to save order. Please try again.')
        return
      }
      console.log('Orders saved to Supabase')
      alert('Order saved as unpaid! Razorpay coming soon.')
      clearCart()
    } catch (e) {
      console.error(e)
      alert('Unexpected error while saving order.')
    }
  }

  if (!isMounted) return null

  return (
    <main className="px-6 py-12 pt-32">
      <Navbar />
      <button
        onClick={handleBack}
        className="mb-4 inline-flex items-center gap-2 rounded-xl bg-black/30 border border-white/10 px-3 py-2 hover:bg-black/40"
      >
        <ArrowLeft size={16} />
        <span>Back to Packages</span>
      </button>
      <h1 className="display uppercase text-4xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length === 0 && <div className="text-white/70">Your cart is empty.</div>}
          {cartItems.map((item) => {
            const isVideo = /video/i.test(item.packageName)
            const isHype = /hype/i.test(item.packageName)
            return (
              <div key={item.id} className="rounded-2xl border border-white/10 p-4 bg-black/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{item.compName}</div>
                    <div className="text-white/70 text-sm">{item.packageName}</div>
                    <div className="text-white/90">₹{item.price}</div>
                  </div>
                  <button
                    className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-black/30 border border-white/10"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove"
                  >
                    <Trash size={18} />
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/50"
                    placeholder="Lifter Name"
                    value={item.lifterName ?? ''}
                    onChange={(e) => updateCartItemData(item.id, { lifterName: e.target.value })}
                  />
                  <input
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/50"
                    placeholder="Weight Class / Lot Number"
                    value={item.weightClass ?? ''}
                    onChange={(e) => updateCartItemData(item.id, { weightClass: e.target.value })}
                  />
                  <input
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/50"
                    placeholder="Phone Number"
                    value={item.phone ?? ''}
                    onChange={(e) => updateCartItemData(item.id, { phone: e.target.value })}
                  />
                  <input
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/50"
                    placeholder="Email"
                    value={item.email ?? ''}
                    onChange={(e) => updateCartItemData(item.id, { email: e.target.value })}
                  />
                  {isVideo && (
                    <div className="md:col-span-2">
                      <div className="mb-2 text-white/80">Select Video Format</div>
                      <div className="flex items-center gap-4">
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="radio"
                            checked={(item.videoFormat ?? '16:9') === '16:9'}
                            onChange={() => updateCartItemData(item.id, { videoFormat: '16:9' })}
                          />
                          <span>16:9 Horizontal</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="radio"
                            checked={(item.videoFormat ?? '16:9') === '9:16'}
                            onChange={() => updateCartItemData(item.id, { videoFormat: '9:16' })}
                          />
                          <span>9:16 Vertical</span>
                        </label>
                      </div>
                    </div>
                  )}
                  {isHype && (
                    <textarea
                      className="md:col-span-2 w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/50"
                      placeholder="Song Choice & Timestamp"
                      rows={4}
                      value={item.songChoice ?? ''}
                      onChange={(e) => updateCartItemData(item.id, { songChoice: e.target.value })}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 p-4 bg-black/20">
            <h2 className="font-semibold mb-3">Checkout</h2>
            <button
              onClick={handleCheckout}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 border border-white/20"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
