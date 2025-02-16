import { createInstance, i18n, TFunction } from 'i18next';
import i18nConfig from './i18nConfig';

export default async function initTranslations(locale: string) {
  const i18nInstance = createInstance();

  const resources: { [l: string]: { translation: any } } = {};
  for (const locale of i18nConfig.locales) {
    resources[locale] = {
      translation: await import(`../locales/${locale}/translation.json`),
    };
  }

  let options = {
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: 'translation',
    fallbackNS: 'translation',
    ns: ['translation'],
    resources,
  };
  await i18nInstance.init(options);

  return i18nInstance;
}

const i18nInstances: { [key: string]: i18n } = {};

export const getTranslation = async (
  params: Promise<{ locale: string }>,
  keyPrefix?: string
): Promise<TFunction> => {
  const _params = await params;
  const locale = _params.locale || i18nConfig.defaultLocale;
  const instance =
    i18nInstances[locale] ||
    (i18nInstances[locale] = await initTranslations(locale));
  return instance.getFixedT(locale, 'translation', keyPrefix);
};
