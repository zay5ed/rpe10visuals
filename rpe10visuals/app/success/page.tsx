import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function SuccessPage() {
    return (
        <main className="px-6 py-12 pt-32 min-h-screen flex flex-col items-center justify-center text-center">
            <Navbar />
            <div className="rounded-2xl border border-white/10 p-8 bg-black/20 max-w-md w-full flex flex-col items-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
                <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-white/70 mb-8">
                    Thank you for your purchase. Your order has been placed successfully and we will start working on your media packages soon.
                </p>
                <Link
                    href="/"
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </main>
    )
}
