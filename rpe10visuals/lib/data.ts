'use client'
export type EventItem = {
  id: string
  name: string
  date: string
  status: 'active' | 'upcoming'
  isActive: boolean
  image: string
  desc: string
}

export const EVENTS: EventItem[] = [
  {
    id: 'e1',
    name: 'Powerlifting India Open Nationals 2026',
    date: 'MAR 28, 2026',
    status: 'active',
    isActive: true,
    image: '/PION_2026-1.jpeg',
    desc: 'High-energy coverage focused on peak attempts and atmosphere.'
  },
  {
    id: 'e2',
    name: 'Powerlifting India Benchpress Nationals',
    date: 'APR 12, 2026',
    status: 'upcoming',
    isActive: false,
    image: 'PIBN_2026.jpeg',
    desc: 'Classic meet visuals—clean athlete highlights and crowd moments.'
  },
  {
    id: 'e3',
    name: 'Powerlifting India Junior Nationals 2026',
    date: 'MAY 04, 2026',
    status: 'upcoming',
    isActive: false,
    image: '/PIJN_2026.jpeg',
    desc: 'Raw strength storytelling—lifts, focus, and intensity.'
  }
  
 
]
