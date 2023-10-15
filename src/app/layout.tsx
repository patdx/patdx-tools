import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Patdx Tools',
  description: 'Various Tools',
  appleWebApp: {
    capable: true,
    title: 'Patdx Tools',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'relative')}>
        <div className="sticky z-10 top-0 left-0 right-0 p-2 text-blue-500 gap-2 flex flex-wrap">
          <Link href={'/'}>Home</Link>
          <Link href={'/clock'}>Clock</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
