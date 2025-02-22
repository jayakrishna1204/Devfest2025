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

const RootLayout: MyComponent = async ({ children }) => {
  const fakeParams = Promise.resolve({ locale: 'en' });

  return (
    <html lang={'en'}>
      <body className={bodyClass}>
        <MuiProvider>
          <Navbar params={fakeParams} />
          <main>{children}</main>
          <Footer params={fakeParams} />
        </MuiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
