import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'KOKIO | World-Class Luxury Travel & Premium Luggage',
  description: 'Experience cinematic luxury travel gear, engineered luggage, and luxury leather goods.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-[#F8F6F2] text-[#161616] antialiased selection:bg-[#B8892D]/30 selection:text-[#161616]">
        {children}
      </body>
    </html>
  );
}


