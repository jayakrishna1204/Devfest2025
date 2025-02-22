import { Button, Typography } from '@mui/material';
import React from 'react';
import { MyComponent } from '@/types';
import { MyLink } from '@/components/commun/link';
import { PrimarySection } from '@/components/commun/section/sectionType';

const Error404: MyComponent = async () => {
  return (
    <PrimarySection style={{ textAlign: 'center' }}>
      <Typography variant='h1' textAlign='center' color='var(--primary-dark)'>
        You seem to be lost
      </Typography>
      <MyLink href='/'>
        <Button
          variant='contained'
          color='secondary'
          aria-label='Back to a safe place'
        >
          Back to a safe place
        </Button>
      </MyLink>
    </PrimarySection>
  );
};

export default Error404;
