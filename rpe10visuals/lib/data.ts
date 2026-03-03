'use client'
export type EventItem = {
  id: string
  name: string
  date: string
  status: 'active' | 'upcoming'
  isActive: boolean
  image: string
  desc: string
  location: string
}

export const EVENTS: EventItem[] = [
  {
    id: 'e1',
    name: 'Powerlifting India Open Nationals 2026',
    date: 'MARCH 24TH to 28TH, 2026',
    status: 'active',
    isActive: true,
    image: '/PION_2026-1.jpeg',
    desc: 'National Senior Classic Powerlifting Championship 2026',
    location: '📍Mangalore, Karnataka'
  },
  {
    id: 'e3',
    name: 'Powerlifting India Junior Nationals 2026',
    date: 'MAY 15TH to 20TH, 2026',
    status: 'upcoming',
    isActive: false,
    image: '/PIJN_2026.jpeg',
    desc: 'National Sub Junior & Junior Classic Powerlifting Championship 2026',
    location: '📍Amalapuram, Andhra Pradesh'
  },
  {
    id: 'e2',
    name: 'Powerlifting India Benchpress Nationals',
    date: 'JANUARY 5TH to 10TH, 2027',
    status: 'upcoming',
    isActive: false,
    image: 'PIBN_2026.jpeg',
    desc: 'National Classic & Equipped Bench Press Championship 2027',
    location: '📍New Delhi, Delhi'
  }
  
 
]
