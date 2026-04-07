import './globals.css';
import { Montserrat } from 'next/font/google';
import Navbar from '@/components/Navbar';
import HelpSupport from '@/components/HelpSupport';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'], 
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <Navbar />      
        <HelpSupport />                
        {children}
      </body>
    </html>
  );
}