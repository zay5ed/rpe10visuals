'use client'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/logo-light-removebg-preview.png"
            alt="RPE 10 Visuals"
            width={225}
            height={50}
            className="w-[225px] h-auto max-w-full"
          />
        </div>
        <h2 className="text-5xl font-bold display mb-6">ABOUT US</h2>
        <div className="space-y-5 text-white/70 leading-7">
          <p>
            RPE10Visuals is a media company providing professional media packages for athletes competing in powerlifting competitions.
          </p>
          <p>
            Our team has been closely involved in Indian powerlifting for years, witnessing the steady growth of the sport — from smaller local meets to large, professionally run competitions. Being part of that environment has given us a clear understanding of what competition day represents and why it deserves to be documented properly.
          </p>
          <p>
            As the standard of performance continues to rise, so does the expectation for quality media. Athletes invest months of preparation into a single day on the platform. We make sure that day is captured with clarity and professionalism.
          </p>
        </div>
      </div>
    </section>
  )
}
