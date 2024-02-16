// Import the Inter font
import { Inter, Lusitana } from 'next/font/google'

// Specify the font subset that you want to use, note that this is not a default export
export const inter = Inter({ subsets: ['latin'] })

// We export ahotner next font. Watch the type definition for Lusitana to determine which options
// are required when instantiating it
export const lusitana = Lusitana({ weight: '400', subsets: ['latin'] })
