import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const WEBHOOK_SECRET = process.env.DIRECTUS_WEBHOOK_SECRET

// Verificar firma del webhook (seguridad)
function verifyWebhookSignature(body: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.warn('⚠️ DIRECTUS_WEBHOOK_SECRET not configured - skipping signature verification')
    return true // En desarrollo, permitir sin verificación
  }
  
  if (!signature) {
    console.warn('⚠️ No signature provided - skipping verification in development')
    return process.env.NODE_ENV === 'development'
  }
  
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('hex')
    
  // Asegurar que ambos strings tengan la misma longitud antes de comparar
  if (signature.length !== expectedSignature.length) {
    console.error('❌ Signature length mismatch')
    return false
  }
    
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-directus-signature') || ''
    
    // Verificar autenticidad del webhook
    if (!verifyWebhookSignature(body, signature)) {
      console.error('❌ Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }
    
    const payload = JSON.parse(body)
    console.log('📨 Webhook received:', payload.event, payload.collection)
    
    // Determinar qué cache invalidar basado en el evento
    switch (payload.event) {
      case 'items.create':
      case 'items.update':
      case 'items.delete':
        if (payload.collection === 'Productos') {
          await revalidateTag('products')
          console.log('✅ Products cache invalidated')
          // Las categorías también se invalidan ya que se extraen de productos
        }
        break
        
      default:
        console.log(`ℹ️ Unhandled webhook event: ${payload.event}`)
    }
    
    return NextResponse.json({ 
      success: true, 
      revalidated: true,
      timestamp: new Date().toISOString(),
      event: payload.event,
      collection: payload.collection
    })
    
  } catch (error) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Endpoint GET para health check
export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    endpoint: 'webhook-revalidate',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    webhookSecretConfigured: !!process.env.DIRECTUS_WEBHOOK_SECRET
  })
}
