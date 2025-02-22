import { TeamMembers } from '@/components/team/team-members';
import { PrimarySection, SecondarySection } from '@/components/commun/section/sectionType';
import Intro from './introduction.fr.mdx';
import { CommonParams, MyComponent } from '@/types';
import { getTranslation } from '@/i18n/i18n';
import { textAlign } from '@mui/system';
import { Typography } from '@mui/material';

export async function generateMetadata({ params }: CommonParams) {
  const t = await getTranslation(params);
  return {
    title: t('pages.team.name'),
  };
}

export default async function Team({ params }: CommonParams) {
  const t = await getTranslation(params);

  return (
    <>
      <Typography style={{textAlign: 'center'}} variant="h1" color="secondary">
        {t('pages.team.name')}
      </Typography>
      <SecondarySection>
        <Intro />
      </SecondarySection>
      <PrimarySection>
        <Typography variant="h2" color="primary">
          {t('pages.team.membersTitle')}
        </Typography>
        <TeamMembers />
      </PrimarySection>
    </>
  );
}
