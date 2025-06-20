import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { TRPCProvider } from '@/components/TRPCProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = { title: 'Jarvis Assistant', description: 'Finanze & Liste' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" data-theme="light">
      <body className={inter.className}>
        <TRPCProvider>
    
    <TopBar />      <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </TRPCProvider>
      </body>
    </html>
  );
}
