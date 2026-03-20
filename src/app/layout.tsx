import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import '../styles/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Header } from '@/components/header/header';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const interTight = Inter({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['700'],
});

export const metadata: Metadata = {
  title: 'Mundo Pet',
  description:
    'Aqui você pode ver todos os clientes e serviços agendados para hoje.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('font-sans', geist.variable)}>
      <body className={`${inter.variable} ${interTight.variable} antialiased`}>
        <Header />
        <TooltipProvider>
          <div className="max-w-3xl mx-auto">
            <main className="flex flex-1 flex-col mt-12">
              {children}
              <Toaster position="top-right" />
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
