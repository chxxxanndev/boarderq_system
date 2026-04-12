import './globals.css';
import { Montserrat } from 'next/font/google';
import Navbar from '@/components/Navbar';
import HelpSupport from '@/components/HelpSupport';
import { SidebarProvider } from '@/context/SidebarContext';
import { HelpProvider } from '@/context/HelpContext'; // Make sure this file exists (see step 2)

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
        <SidebarProvider> 
          <HelpProvider> {/* Added opening tag here */}
            <Navbar />      
            <HelpSupport />                
            {children}
          </HelpProvider> 
        </SidebarProvider>
      </body>
    </html>
  );
}