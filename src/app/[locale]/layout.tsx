import type { Metadata } from 'next';
import i18nConfig from '@/i18n/i18nConfig';
import { Footer } from '@/components/footer/footer';
import { bodyClass, MuiProvider } from '@/layout/theme';

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
          <main>{children}</main>
          <Footer params={params} />
        </MuiProvider>
      </body>
    </html>
  );
}
