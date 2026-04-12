'use client';
import './globals.css';
import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import HelpSupport from '@/components/HelpSupport'; // Import the component
import { SidebarProvider } from '@/context/SidebarContext';
import { HelpProvider } from '@/context/HelpContext'; 
import { ThemeProvider } from '@/context/ThemeContext';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // Logic to determine if we should show the dashboard shell
  const isDashboard = pathname.startsWith('/admin') || pathname.startsWith('/tenant');

  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <ThemeProvider>
          <SidebarProvider>
            <HelpProvider>
              
              <div className="flex min-h-screen bg-[#F8FAFC]">
                
                {/* 1. Sidebar only shows on dashboard pages */}
                {isDashboard && <Sidebar />}

                <div className="flex flex-col flex-1 min-w-0">
                  <Navbar />
                  <main className="flex-1">
                    {children}
                  </main>
                </div>

                {/* 2. Place HelpSupport here as a sibling to the layout structure */}
                <HelpSupport />

              </div>

            </HelpProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}