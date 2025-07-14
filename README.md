# Photography Portfolio

A production-ready photography portfolio website with an admin panel for image management, built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

### User-Facing Features
- **Beautiful Homepage**: One-page layout with smooth scrolling navigation
- **Hero Section**: Full-screen background with compelling headline
- **Portfolio Gallery**: Responsive masonry grid displaying photos from Supabase
- **Booking System**: Two package options with Stripe and PayPal integration
- **Contact Form**: Powered by Formspree for easy contact management
- **Mobile Responsive**: Fully responsive design with mobile navigation

### Admin Features
- **Secure Authentication**: Supabase-powered login system
- **Photo Management**: Upload, view, and delete portfolio photos
- **Drag & Drop Upload**: Intuitive file upload interface
- **Real-time Updates**: Instant photo gallery updates

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **Payments**: Stripe Payment Links + PayPal JS SDK
- **Forms**: Formspree
- **Deployment**: Vercel

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd photography-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your actual environment variables (see [Setup Guide](SETUP.md))

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
NEXT_PUBLIC_STRIPE_PORTRAIT_PAYMENT_LINK=your-stripe-portrait-payment-link
NEXT_PUBLIC_STRIPE_EVENT_PAYMENT_LINK=your-stripe-event-payment-link

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id

# Formspree
NEXT_PUBLIC_FORMSPREE_FORM_ID=your-formspree-form-id
```

## Database Setup

Run this SQL in your Supabase SQL editor:

```sql
-- Create photos table
create table photos (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  created_at timestamptz default now()
);

-- Create storage bucket
insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true);

-- Set up RLS policies (optional - for additional security)
alter table photos enable row level security;
create policy "Public photos are viewable by everyone" on photos for select using (true);
create policy "Authenticated users can insert photos" on photos for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can delete photos" on photos for delete using (auth.role() = 'authenticated');
```

## Deployment

### Deploy to Vercel

1. **Connect to Vercel**
   ```bash
   vercel
   ```

2. **Set Environment Variables**
   Add all environment variables in your Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Alternative: Deploy via GitHub

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables
4. Deploy

## Project Structure

```
├── pages/
│   ├── _app.tsx          # App wrapper
│   ├── index.tsx         # Homepage
│   ├── admin.tsx         # Admin panel
│   └── login.tsx         # Login page
├── lib/
│   ├── supabase.ts       # Supabase client
│   └── payments.ts       # Payment handlers
├── styles/
│   └── globals.css       # Global styles
├── public/
│   └── favicon.ico       # Favicon
├── SETUP.md              # Detailed setup guide
└── README.md             # This file
```

## Usage

### Admin Access
1. Go to `/login`
2. Sign in with your Supabase account
3. Upload and manage photos at `/admin`

### Payment Integration
- Stripe: Uses Payment Links for quick setup
- PayPal: Integrated with PayPal JS SDK for custom checkout

### Contact Form
- Powered by Formspree
- Submissions sent directly to your email

## Customization

### Styling
- Edit `styles/globals.css` for global styles
- Modify Tailwind classes in components
- Update colors and fonts in `tailwind.config.js`

### Content
- Update homepage content in `pages/index.tsx`
- Modify package pricing in `lib/payments.ts`
- Change site title and meta tags

### Features
- Add new pages in the `pages/` directory
- Extend the admin panel with additional features
- Add more payment options or booking features

## Support

For detailed setup instructions, see [SETUP.md](SETUP.md).

## License

This project is open source and available under the [MIT License](LICENSE).
