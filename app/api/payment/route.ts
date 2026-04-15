import { NextResponse } from 'next/server'

export async function GET() { 
  return NextResponse.json({ status: 'ok' }) 
}

export async function POST(req: Request) {
  const body = await req.json()
  // Phase 1: simulate payment success
  const success = Math.random() > 0.1  // 90% success rate
  return NextResponse.json({ 
    success, 
    orderId: `ORD-${Date.now()}`, 
    message: success ? 'Payment successful' : 'Payment failed' 
  })
}
