'use client'
import { Camera, Video, Music } from 'lucide-react'

export default function PackagesSection() {
  return (
    <section className="bg-[#f5f5f5] text-black min-h-[80vh] py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold display text-center mb-12">PACKAGES OFFERED</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white border-2 border-black rounded-xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Camera size={32} />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">PHOTO PACKAGE</h3>
            <p className="text-center font-bold text-xl mb-4 text-[#BEA1F7]">INR 1999</p>
            <ul className="space-y-2 text-lg">
              <li>• 12 High-Res Pictures</li>
              <li>• Assortment of pictures during and before each lift</li>
              <li>• Delivery within 3 days of completion of competition</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-black rounded-xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Video size={32} />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">VIDEO PACKAGE</h3>
            <p className="text-center font-bold text-xl mb-4 text-[#BEA1F7]">INR 2499</p>
            <ul className="space-y-2 text-lg">
              <li>• 4k Resolution (16:9 or 9:16)</li>
              <li>• Dynamic Videos of all 3 attempts of all 3 lifts</li>
              <li>• Delivery within 5 days of completion of competition</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-black rounded-xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Music size={32} />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">HYPE EDIT</h3>
            <p className="text-center font-bold text-xl mb-4 text-[#BEA1F7]">INR 3499</p>
            <ul className="space-y-2 text-lg">
              <li>• 30-60sec cinematic edit recapping your meet</li>
              <li>• Song of your choice (custom section sync)</li>
              <li>• Delivery within 10 days of completion of competition</li>
            </ul>
          </div>

          <div className="bg-black text-white border-2 border-black rounded-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#BEA1F7] text-black text-xs font-bold px-3 py-1 rounded-bl-lg">PREMIUM</div>
            <div className="flex items-center justify-center mb-4">
              <div className="flex gap-x-2">
                <Camera size={28} className="text-white" />
                <Video size={28} className="text-white" />
                <Music size={28} className="text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">THE COMPLETE RPE10 BUNDLE</h3>
            <p className="text-center font-bold text-2xl mb-4 text-[#BEA1F7]">INR 4499</p>
            <ul className="space-y-2 text-base text-white/90">
              <li>• 12 High-Res Pictures w/ Professional color grading</li>
              <li>• 4k Dynamic Lift Videos (all attempts)</li>
              <li>• 30-60sec Cinematic Hype Edit w/ custom song sync (includes 2 revisions)</li>
              <li>• Basically an all in one package consisting the photos,videos and hype edit</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
