import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
