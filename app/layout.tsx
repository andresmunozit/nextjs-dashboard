// Let's add global styles to the application
import '@/app/ui/global.css'

// Import the next font
import { inter } from '@/app/ui/fonts'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

// This is the RootLayout and it's required. Any UI you add to the root layout will be shared across
// all pages in the application.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      { /* Let's use the inter next found in our body element */ }
      { /* We also apply the Tailwind's antialiased class which smoots out the font */ }
      <body className={ `${inter.className} antialiased` }>{children}</body>
    </html>
  );
}
