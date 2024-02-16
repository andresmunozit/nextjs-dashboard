// Let's add global styles to the application
import '@/app/ui/global.css'

// Import the next font
import { inter } from '@/app/ui/fonts'

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
