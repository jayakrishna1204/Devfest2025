import { Send } from '@mui/icons-material';
import React from 'react';
import { Button } from '@mui/material';
import { MyLink } from '@/components/commun/link';
import { getTranslation } from '@/i18n/i18n';
import { MyComponent } from '@/types';

export const SubscribeNewsletter: MyComponent = async ({ params }) => {
  const t = await getTranslation(params, 'footer');
  return (
    <MyLink href='https://eepurl.com/c7X2V9'>
      <Button variant='contained' aria-label='newsletter'>
        <Send style={{ marginRight: '20px' }} /> {t('news-button')}
      </Button>
    </MyLink>
  );
};
