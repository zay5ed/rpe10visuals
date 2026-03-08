import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabaseClient } from '@/lib/supabase'

export async function POST(req: Request) {
    try {
        const rawBody = await req.text()
        const signature = req.headers.get('x-razorpay-signature')

        const secret = process.env.RAZORPAY_WEBHOOK_SECRET

        if (!secret || !signature) {
            console.error('Webhook missing secret or signature')
            return NextResponse.json({ error: 'Missing secret or signature' }, { status: 400 })
        }

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(rawBody)
            .digest('hex')

        if (expectedSignature !== signature) {
            console.error('Invalid signature')
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
        }

        const payload = JSON.parse(rawBody)

        const razorpayOrderId = payload.payload?.order?.entity?.id || payload.payload?.payment?.entity?.order_id

        if (!razorpayOrderId) {
            console.error('Missing order_id in webhook payload')
            return NextResponse.json({ error: 'Missing order_id in payload' }, { status: 400 })
        }

        // We need to type Supabase appropriately or use any if not strictly typed
        const supabase = getSupabaseClient() as any

        switch (payload.event) {
            case 'order.paid': {
                const { error } = await supabase
                    .from('orders')
                    .update({ payment_status: 'paid' })
                    .eq('razorpay_order_id', razorpayOrderId)

                if (error) {
                    console.error('Supabase update error:', error)
                    return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
                }

                console.log(`Successfully updated order ${razorpayOrderId} to paid`)
                break
            }
            case 'payment.failed': {
                const { error } = await supabase
                    .from('orders')
                    .update({ payment_status: 'failed' })
                    .eq('razorpay_order_id', razorpayOrderId)

                if (error) {
                    console.error('Supabase update error:', error)
                    return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
                }

                console.log(`Successfully updated order ${razorpayOrderId} to failed`)
                break
            }
            default:
                console.log(`Unhandled event type: ${payload.event}`)
        }

        return NextResponse.json({ status: 'ok' })

    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
