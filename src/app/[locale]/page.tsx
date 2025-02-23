import { DevfestNumbers, HomeJumbo } from '@/components/home';
import { CommonParams } from '@/types';
import '@/components/home/home.scss';
import { Typography } from '@mui/material';
import { Youtube } from '@/components/commun/youtube';
import { getTranslation } from '@/i18n/i18n';
import {
  PrimarySection,
  Section,
} from '@/components/commun/section/sectionType';
import { HomeMap } from '@/components/home/map';
import { DevfestPhotos } from '@/components/home/photos';
import Affiche from '@/images/affiche.jpg';
import Image from 'next/image';

export default async function Home({ params }: CommonParams) {
  const t = await getTranslation(params);
  return (
    <>
      <HomeJumbo params={params} />
      <PrimarySection>
        <Typography variant='h1'>{t('pages.home.what-is')}</Typography>
        <Typography variant='body1'>{t('site.description')}</Typography>
        <Typography variant='body1'>{t('site.theme')}</Typography>
        <Section fullWidth style={{ textAlign: 'center' }}>
          <Image
            src={Affiche}
            style={{ width: '50%', height: 'auto' }}
            alt={'Poster'}
          />
        </Section>
        <DevfestNumbers params={params} />
        <Youtube id='MDrrn0du1-s' title='After Movie 2024' />
      </PrimarySection>
      <HomeMap params={params} />
      <Section fullWidth>
        <DevfestPhotos params={params} />
      </Section>
    </>
  );
}
