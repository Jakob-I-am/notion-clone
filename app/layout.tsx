import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';

import './globals.css';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Notion Clone',
  description: 'An AI notion-like productivity app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
          <Header />

          <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1 p-4 bg-gray-100 overflow-y-auto scrollbar-hide'>
              {children}
            </div>
          </div>

          <Toaster position='top-center' />
        </body>
      </html>
    </ClerkProvider>
  );
}
