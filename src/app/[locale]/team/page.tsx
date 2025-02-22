import { TeamMembers } from '@/components/team/team-members';
import {
  PrimarySection,
  SecondarySection,
} from '@/components/commun/section/sectionType';
import { CommonParams } from '@/types';
import { getTranslation } from '@/i18n/i18n';
import { Typography } from '@mui/material';
import { MDXI18nBuilder } from '@/i18n/MDXI18nBuilder';
import IntroFR from './introduction.fr.mdx';
import IntroEN from './introduction.en.mdx';

export async function generateMetadata({ params }: CommonParams) {
  const t = await getTranslation(params);
  return {
    title: t('pages.team.name'),
  };
}

export default async function Team({ params }: CommonParams) {
  const t = await getTranslation(params);
  const Intro = await MDXI18nBuilder.withComponents(params, {
    fr: IntroFR,
    en: IntroEN,
  });

  return (
    <>
      <Typography
        style={{ textAlign: 'center' }}
        variant='h1'
        color='secondary'
      >
        {t('pages.team.name')}
      </Typography>
      <SecondarySection>
        <Intro />
      </SecondarySection>
      <PrimarySection>
        <Typography variant='h2' color='primary'>
          {t('pages.team.membersTitle')}
        </Typography>
        <TeamMembers />
      </PrimarySection>
    </>
  );
}
