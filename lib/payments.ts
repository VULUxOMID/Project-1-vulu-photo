import { loadStripe } from '@stripe/stripe-js'
import { loadScript } from '@paypal/paypal-js'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Payment packages
export const PACKAGES = {
  PORTRAIT: {
    name: 'Portrait Session',
    price: 200,
    description: '1-hour session, 20+ edited photos, online gallery, print release',
    stripePaymentLink: process.env.NEXT_PUBLIC_STRIPE_PORTRAIT_PAYMENT_LINK || '#',
    paypalItemId: 'portrait-session'
  },
  EVENT: {
    name: 'Event Photography',
    price: 800,
    description: 'Up to 4 hours, 100+ edited photos, online gallery, print release, second shooter available',
    stripePaymentLink: process.env.NEXT_PUBLIC_STRIPE_EVENT_PAYMENT_LINK || '#',
    paypalItemId: 'event-photography'
  }
}

// Stripe payment handler
export const handleStripePayment = async (packageType: 'PORTRAIT' | 'EVENT') => {
  try {
    const stripe = await stripePromise
    if (!stripe) throw new Error('Stripe failed to load')

    const pkg = PACKAGES[packageType]
    
    // For production, you'd create a checkout session on your backend
    // For now, redirect to Stripe Payment Link
    window.open(pkg.stripePaymentLink, '_blank')
  } catch (error) {
    console.error('Stripe payment error:', error)
    alert('Payment processing failed. Please try again.')
  }
}

// PayPal payment handler
export const handlePayPalPayment = async (packageType: 'PORTRAIT' | 'EVENT') => {
  try {
    const paypal = await loadScript({
      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
      currency: 'USD'
    })

    if (!paypal || !paypal.Buttons) {
      throw new Error('PayPal SDK failed to load')
    }

    const pkg = PACKAGES[packageType]

    // Create a container for PayPal buttons
    const container = document.createElement('div')
    container.id = 'paypal-button-container'
    document.body.appendChild(container)

    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              value: pkg.price.toString(),
              currency_code: 'USD'
            },
            description: pkg.name
          }]
        })
      },
      onApprove: async (data, actions) => {
        try {
          const order = await actions.order?.capture()
          alert('Payment successful! You will be contacted shortly.')
          // Here you would typically send the order details to your backend
          console.log('PayPal Order:', order)
        } catch (error) {
          console.error('PayPal capture error:', error)
          alert('Payment processing failed. Please try again.')
        } finally {
          document.body.removeChild(container)
        }
      },
      onError: (err) => {
        console.error('PayPal error:', err)
        alert('Payment processing failed. Please try again.')
        document.body.removeChild(container)
      },
      onCancel: () => {
        console.log('PayPal payment cancelled')
        document.body.removeChild(container)
      }
    }).render('#paypal-button-container')

  } catch (error) {
    console.error('PayPal payment error:', error)
    alert('Payment processing failed. Please try again.')
  }
} 