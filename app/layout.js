'use client';
import './globals.css';
import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import HelpSupport from '@/components/HelpSupport'; 
import { SidebarProvider } from '@/context/SidebarContext';
import { HelpProvider } from '@/context/HelpContext'; 
import { ThemeProvider } from '@/context/ThemeContext';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  const isDashboard = pathname.startsWith('/admin') || pathname.startsWith('/tenant');

  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <ThemeProvider>
          <SidebarProvider>
            <HelpProvider>
              
              <div className="flex min-h-screen bg-[#F8FAFC]">
                
                {isDashboard && <Sidebar />}

                <div className="flex flex-col flex-1 min-w-0">
                  <Navbar />
                  <main className="flex-1">
                    {children}
                  </main>
                </div>

                <HelpSupport />

              </div>

            </HelpProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}