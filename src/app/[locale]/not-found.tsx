import { Button, Typography } from '@mui/material';
import React from 'react';
import { MyComponent } from '@/types';
import { MyLink } from '@/components/commun/link';
import { PrimarySection } from '@/components/commun/section/sectionType';
import { getTranslation } from '@/i18n/i18n';

const Error404: MyComponent = async ({ params }) => {
  const t = await getTranslation(params, '404');
  return (
    <PrimarySection style={{ textAlign: 'center' }}>
      <Typography variant='h1' textAlign='center' color='var(--primary-dark)'>
        {t('main')}
      </Typography>
      <MyLink href='/'>
        <Button variant='contained' color='secondary' aria-label={t('button')}>
          {t('button')}
        </Button>
      </MyLink>
    </PrimarySection>
  );
};

export default Error404;
