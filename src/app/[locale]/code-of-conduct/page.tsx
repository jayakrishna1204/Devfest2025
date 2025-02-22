import { MDXI18nBuilder } from '@/i18n/MDXI18nBuilder';
import { CommonParams } from '@/types';
import { getTranslation } from '@/i18n/i18n';

export async function generateMetadata({ params }: CommonParams) {
  const t = await getTranslation(params);
  return {
    title: t('pages.code-of-conduct.name'),
  };
}

export default MDXI18nBuilder.pageWithPrefix('code-of-conduct');
