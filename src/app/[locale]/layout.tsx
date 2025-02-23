import { bodyClass, MuiProvider } from '@/layout/theme';
import { Footer } from '@/layout/footer/footer';
import { Navbar } from '@/layout/navbar/navbar';
import { CommonParams, MyComponent } from '@/types';
import { getTranslation } from '@/i18n/i18n';
import i18nConfig from '@/i18n/i18nConfig';
import { Analytics } from '@/analytics';

export async function generateMetadata({ params }: CommonParams) {
  const t = await getTranslation(params);
  return {
    title: 'Devfest Nantes',
    description: t('pages.home.description'),
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const RootLayout: MyComponent = async ({ children, params }) => {
  const _params = await params;
  const locale = _params?.locale || i18nConfig.defaultLocale;

  return (
    <html lang={locale}>
      <body className={bodyClass}>
        <Analytics />
        <MuiProvider>
          <Navbar params={params} />
          <main>{children}</main>
          <Footer params={params} />
        </MuiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
