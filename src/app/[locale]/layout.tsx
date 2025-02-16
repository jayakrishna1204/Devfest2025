import type { Metadata } from 'next';
import i18nConfig from '@/i18n/i18nConfig';
import { bodyClass, MuiProvider } from '@/layout/theme';
import { Footer } from '@/layout/footer/footer';
import { Navbar } from '@/layout/navbar/navbar';

export const metadata: Metadata = {
  title: 'Devfest Nantes 2025',
  description: 'Devfest Nantes 2025',
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

type RootLayoutType = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;
export default async function RootLayout({ children, params }: RootLayoutType) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={bodyClass}>
        <MuiProvider>
          <Navbar params={params} />
          <main>{children}</main>
          <Footer params={params} />
        </MuiProvider>
      </body>
    </html>
  );
}
