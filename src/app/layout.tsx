import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Logo from '@/components/Logo';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.AUTH_TRUST_HOST as string),
  title: {
    template: '%s | Quick CMS',
    default: 'Quick CMS',
  },
  description:
    'The only headless CMS to store, retrive content for your landing pages',
  openGraph: {
    title: 'Quick CMS',
    description:
      'The only headless CMS to store, retrive content for your landing pages',
    siteName: 'Quick CMS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick CMS',
    description:
      'The only headless CMS to store, retrive content for your landing pages',
    creator: '@siemen_subbaiah',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={notoSans.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <section className='hidden md:block'>{children}</section>
          <section className='md:hidden p-4 flex flex-col items-center justify-center h-screen'>
            <Logo height={120} width={120} />
            <p className='text-center'>
              This webapp is best viewed on laptop/desktop screens
            </p>
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
