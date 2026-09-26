import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: Stripe.LatestApiVersion,
})

const priceIdToPlan: { [key: string]: string } = {
  'price_1U9j6wIKGPaG04MI3r2Nxaoo': 'starter',
  'price_1U9j5nIKGPaG04MIhZdBrv7n': 'pro',
  'price_1U9j4HIKGPaG04MINVDXZSQy': 'agency',
}

// Função assíncrona que não bloqueia
async function updateUserPlan(email: string, priceId: string) {
  console.log('🔄 [1] Email:', email)
  console.log('🔄 [2] Price ID:', priceId)
  console.log('🔄 [3] Plan:', priceIdToPlan[priceId])

  const plan = priceIdToPlan[priceId] || 'free'

  const { data, error } = await supabase
    .from('users')
    .update({ plan })
    .eq('email', email)
    .select()

  if (error) {
    console.error('❌ ERRO NA ATUALIZAÇÃO:', error)
  } else {
    console.log('✅ Atualizado! Dados:', data)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!body || !signature) {
      return NextResponse.json({ error: 'Invalid' }, { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    // Retorna sucesso IMEDIATAMENTE
    const response = NextResponse.json({ received: true })

    // Processa em background (não bloqueia)
    if (event.type === 'checkout.session.completed') {
     console.log('✅ [E] É checkout.session.completed')
     const session = event.data.object as Stripe.Checkout.Session
  
     console.log('✅ Email:', session.customer_email)
     console.log('✅ Subscription:', session.subscription)
      
     if (session.customer_email && session.subscription) {
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  )
  const priceId = subscription.items.data[0]?.price.id

  // ✅ Await it, or at least catch errors
  try {
    await updateUserPlan(session.customer_email, priceId || '')
  } catch (err) {
    console.error('❌ updateUserPlan failed:', err)
  }
}
    }

    return response
  } catch (error: any) {
    console.error('❌ Erro webhook:', error.message)
    return NextResponse.json({ error: 'Error' }, { status: 400 })
  }
}