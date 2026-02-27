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
    name: 'POWER MEET SERIES',
    date: 'MAR 28, 2026',
    status: 'active',
    isActive: true,
    image: '/prar4.jpeg',
    desc: 'High-energy coverage focused on peak attempts and atmosphere.'
  },
  {
    id: 'e2',
    name: 'IRON ARENA CLASSIC',
    date: 'APR 12, 2026',
    status: 'upcoming',
    isActive: false,
    image: '/prar3.jpeg',
    desc: 'Classic meet visuals—clean athlete highlights and crowd moments.'
  },
  {
    id: 'e3',
    name: 'RAW STRENGTH OPEN',
    date: 'MAY 04, 2026',
    status: 'upcoming',
    isActive: false,
    image: '/prar2.jpeg',
    desc: 'Raw strength storytelling—lifts, focus, and intensity.'
  },
  {
    id: 'e4',
    name: 'DEADLIFT SHOWDOWN',
    date: 'JUN 01, 2026',
    status: 'upcoming',
    isActive: false,
    image: '/prar.jpeg',
    desc: 'Spotlighting heavy pulls and electrifying finales.'
  },
  {
    id: 'e5',
    name: 'STEEL CITY OPEN',
    date: 'JUL 15, 2026',
    status: 'upcoming',
    isActive: false,
    image: '/60b5492f-d596-4e34-bae0-aa609fbdbd05.jpeg',
    desc: 'Industrial vibes and gritty platform moments—pure meet energy.'
  },
  {
    id: 'e6',
    name: 'PR HUNT INVITATIONAL',
    date: 'AUG 02, 2026',
    status: 'upcoming',
    isActive: false,
    image: '/500e10d9-c93c-4665-890b-9c23f22194a6.jpeg',
    desc: 'Chasing personal bests with cinematic lighting and close-up intensity.'
  }
]
