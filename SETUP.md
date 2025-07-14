# Photography Portfolio Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PORTRAIT_PAYMENT_LINK=your-stripe-portrait-payment-link
NEXT_PUBLIC_STRIPE_EVENT_PAYMENT_LINK=your-stripe-event-payment-link

# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id

# Formspree Configuration
NEXT_PUBLIC_FORMSPREE_FORM_ID=your-formspree-form-id
```

## Supabase Setup

1. Create a new project at https://supabase.com
2. Go to Settings > API to get your URL and anon key
3. Create the photos table with this SQL:

```sql
create table photos (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  created_at timestamptz default now()
);
```

4. Create a storage bucket named `portfolio`
5. Set up Row Level Security (RLS) policies as needed

## Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your publishable key from the dashboard
3. Create Payment Links for your packages:
   - Portrait Session: $200
   - Event Photography: $800
4. Copy the Payment Link URLs and add them to your environment variables

## PayPal Setup

1. Create a PayPal Developer account
2. Get your client ID from the dashboard

## Formspree Setup

1. Create a Formspree account at https://formspree.io
2. Create a new form and get the form ID

## Running the Project

```bash
npm install
npm run dev
```

The application will be available at http://localhost:3000 