'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = {
  id: string
  compName: string
  packageName: string
  price: number
  image?: string
}

type CartContextValue = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('rpe10_cart') : null
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('rpe10_cart', JSON.stringify(cartItems))
    } catch {}
  }, [cartItems])

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item])
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id))
  }

  const value = useMemo(() => ({ cartItems, addToCart, removeFromCart }), [cartItems])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
