import i18nConfig from '@/i18n/i18nConfig';
import { bodyClass, MuiProvider } from '@/layout/theme';
import { Footer } from '@/layout/footer/footer';
import { Navbar } from '@/layout/navbar/navbar';
import { CommonParams, MyComponent } from '@/types';
import { getTranslation } from '@/i18n/i18n';

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
};

export default RootLayout;
