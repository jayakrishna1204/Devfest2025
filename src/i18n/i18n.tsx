import { createInstance, i18n, Resource, TFunction } from 'i18next';
import i18nConfig from './i18nConfig';
import { CommonParams } from '@/types';

async function getI18nResources() {
  const resources: Resource = {};
  for (const locale of i18nConfig.locales) {
    resources[locale] = {
      translation: await import(`../locales/${locale}/translation.json`),
    };
  }
  return resources;
}

export default async function initTranslations(
  locale: string,
  resources?: Resource
) {
  const i18nInstance = createInstance();

  if (!resources) {
    resources = await getI18nResources();
  }

  const options = {
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: 'translation',
    fallbackNS: 'translation',
    ns: ['translation'],
    resources,
  };
  await i18nInstance.init(options);

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}

const i18nInstances: { [key: string]: i18n } = {};

export const getTranslation = async (
  params: CommonParams['params'],
  keyPrefix?: string
): Promise<TFunction> => {
  const _params = await params;
  const locale = _params?.locale || i18nConfig.defaultLocale;
  const instance =
    i18nInstances[locale] ||
    (i18nInstances[locale] = (await initTranslations(locale)).i18n);
  return instance.getFixedT(locale, 'translation', keyPrefix);
};
