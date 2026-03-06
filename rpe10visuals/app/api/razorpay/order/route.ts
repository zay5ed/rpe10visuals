import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { amount, receipt } = body

        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
        const key_secret = process.env.RAZORPAY_KEY_SECRET

        if (!key_id || !key_secret) {
            return NextResponse.json(
                { error: 'Missing Razorpay credentials' },
                { status: 500 }
            )
        }

        const auth = Buffer.from(`${key_id}:${key_secret}`).toString('base64')

        const response = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${auth}`,
            },
            body: JSON.stringify({
                amount: amount,
                currency: 'INR',
                receipt: receipt || `rcpt_${Date.now()}`,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('Razorpay Error:', errorData)
            return NextResponse.json(
                { error: 'Failed to create Razorpay order' },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error creating order:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
