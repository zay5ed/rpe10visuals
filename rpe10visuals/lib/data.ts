'use client'
export type EventItem = {
  id: string
  name: string
  date: string
  status: 'active' | 'upcoming'
  image: string
  desc: string
}

export const EVENTS: EventItem[] = [
  {
    id: 'e1',
    name: 'POWER MEET SERIES',
    date: 'MAR 28, 2026',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1600&auto=format&fit=crop',
    desc: 'High-energy coverage focused on peak attempts and atmosphere.'
  },
  {
    id: 'e2',
    name: 'IRON ARENA CLASSIC',
    date: 'APR 12, 2026',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop',
    desc: 'Classic meet visuals—clean athlete highlights and crowd moments.'
  },
  {
    id: 'e3',
    name: 'RAW STRENGTH OPEN',
    date: 'MAY 04, 2026',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1542601098-8fc114e148e8?q=80&w=1600&auto=format&fit=crop',
    desc: 'Raw strength storytelling—lifts, focus, and intensity.'
  },
  {
    id: 'e4',
    name: 'DEADLIFT SHOWDOWN',
    date: 'JUN 01, 2026',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1600&auto=format&fit=crop',
    desc: 'Spotlighting heavy pulls and electrifying finales.'
  }
]
