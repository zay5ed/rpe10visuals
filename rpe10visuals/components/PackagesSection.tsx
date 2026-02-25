'use client'
import { Camera, Video, Music } from 'lucide-react'

export default function PackagesSection() {
  return (
    <section className="bg-[#f5f5f5] text-black min-h-[80vh] py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold display text-center mb-12">PACKAGES OFFERED</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-black rounded-xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Camera size={32} />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">PHOTO PACKAGE</h3>
            <ul className="space-y-2 text-lg">
              <li>• 12 High-Res Pictures</li>
              <li>• Assortment of pictures during and before each lift</li>
              <li>• Delivery within 3 days</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-black rounded-xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Video size={32} />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">VIDEO PACKAGE</h3>
            <ul className="space-y-2 text-lg">
              <li>• 4k Resolution (16:9 or 9:16)</li>
              <li>• Dynamic Videos of all 3 attempts of all 3 lifts</li>
              <li>• Delivery within 5 days</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-black rounded-xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Music size={32} />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">HYPE EDIT</h3>
            <ul className="space-y-2 text-lg">
              <li>• 30-60sec cinematic edit recapping your meet</li>
              <li>• Song of your choice (custom section sync)</li>
              <li>• Delivery within 10 days</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
