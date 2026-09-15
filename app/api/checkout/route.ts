import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'as any,
})


export async function POST(request: NextRequest) {
  try {
    const { priceId, email } = await request.json()

    if (!priceId || !email) {
      return NextResponse.json(
        { error: 'priceId e email são obrigatórios' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/pricing?canceled=true`,
      customer_email: email,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Erro ao criar checkout:', error.message)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
