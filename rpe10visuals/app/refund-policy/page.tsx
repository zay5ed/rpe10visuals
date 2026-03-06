import Navbar from "@/components/Navbar"

export default function RefundPolicyPage() {
  return (
    <main className="px-6 py-12 pt-32">
      <Navbar />
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="display uppercase text-5xl font-bold mb-2">Refund Policy</h1>
        <div className="space-y-4 text-white/80 leading-7">
          <p>RPE10Visuals – Refund Policy</p>
          <p>All purchases made for RPE10Visuals media packages are generally considered final and non-refundable, subject to the conditions outlined below.</p>
          <h2 className="text-xl font-semibold mt-6">1. Event Coverage</h2>
          <p>Once the competition or event has begun and RPE10Visuals has started filming, refunds will not be issued under any circumstances.</p>
          <h2 className="text-xl font-semibold mt-6">2. Athlete Withdrawal</h2>
          <p>If an athlete withdraws, fails to appear for their scheduled session, or is unable to complete their lifts, the purchase remains non-refundable, as coverage preparation and event attendance have already been arranged.</p>
          <h2 className="text-xl font-semibold mt-6">3. Event Cancellation</h2>
          <p>If the competition or event is cancelled before coverage begins, RPE10Visuals may offer one of the following at its discretion:</p>
          <ul className="list-disc pl-6">
            <li>A full or partial refund</li>
            <li>Credit toward coverage at a future event</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">4. Service Issues</h2>
          <p>If RPE10Visuals is unable to provide the purchased service due to an internal issue, such as equipment failure, inability to film the athlete’s session, or technical problems preventing coverage, a partial or full refund may be issued depending on the circumstances.</p>
          <h2 className="text-xl font-semibold mt-6">5. Digital Deliverables</h2>
          <p>Once edited media has been completed and delivered to the client, the purchase becomes completely non-refundable.</p>
          <h2 className="text-xl font-semibold mt-6">6. Agreement</h2>
          <p>By purchasing a media package from RPE10Visuals, the client acknowledges and agrees to this Refund Policy.</p>
        </div>
      </div>
    </main>
  )
}
