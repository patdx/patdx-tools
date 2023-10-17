import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import clsx from 'clsx';
import logo from 'assets/src/icon.png';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PTools',
  description: 'Various Tools',
  appleWebApp: {
    capable: true,
    title: 'PTools',
    // https://firt.dev/ios-14.5/#status-bar-change
    // TBH I'm not sure if it is worth it to modify this
    // statusBarStyle: 'black-translucent',
    // Even without, it is still good to have viewport-fit=cover
    // to allow control over the home bar, and left and right margins in
    // landscape mode

    // TODO: add splash screens to manifest too
  },
  themeColor: '#dfd9df',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

// I've tried to set up a "flex" layout with sticky top and bottom, but I'm not sure that this is really an improvement
// over fixed positioning. Additionally, it seems to require more layout hacks to support the viewport cover mode correctly.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'flex flex-col')}>
        <div className="sticky left-0 right-0 top-0 z-10 flex flex-none justify-center border-b border-eggplant bg-eggplant-900 text-eggplant shadow-md pt-safe pr-safe pl-safe landscape:hidden">
          <div className="p-2">
            <Image src={logo} alt="Logo" className="h-6 w-6" />
          </div>
        </div>
        <div className="flex flex-1 flex-col">{children}</div>
        {/* <div className="h-8 absolute bottom-safe left-[50vw] right-0 bg-azure-200"></div>
        <div className="h-8 absolute bottom-0 left-0 right-[50vw] bg-azure"></div> */}
        <div className="sticky bottom-0 left-0 right-0 flex-none border-t border-eggplant bg-eggplant-900 pb-safe">
          <div className="flex h-8 items-stretch justify-center">
            <MyLink href={'/'}>Home</MyLink>
            <MyLink href={'/clock'}>Clock</MyLink>
            <MyLink href={'/about'}>About</MyLink>
          </div>
        </div>
      </body>
    </html>
  );
}

function MyLink(props: { href: string; children?: any }) {
  return (
    <Link
      href={props.href}
      className="flex items-center px-2 hover:bg-eggplant-800 active:bg-eggplant-800"
    >
      <div>{props.children}</div>
    </Link>
  );
}
