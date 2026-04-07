// app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-slate-950`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}



// // app/layout.js
// import './globals.css';
// import { Inter } from 'next/font/google';
// import Navbar from '@/components/Navbar';
// import { ThemeProvider } from '@/context/ThemeContext';

// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.className} antialiased`}>
//         <ThemeProvider>
//           <Navbar />
//           <main className="min-h-screen">
//             {children}
//           </main>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }