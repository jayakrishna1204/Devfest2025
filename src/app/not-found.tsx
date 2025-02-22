import { Button, Typography } from '@mui/material';
import React from 'react';
import { MyComponent } from '@/types';
import { MyLink } from '@/components/commun/link';
import { bodyClass, MuiProvider } from '@/layout/theme';
import { Navbar } from '@/layout/navbar/navbar';
import { Footer } from '@/layout/footer/footer';
import { PrimarySection } from '@/components/commun/section/sectionType';

const Error404: MyComponent = async () => {
  const fakeParams = Promise.resolve({ locale: 'en' });
  return (
    <html>
      <body className={bodyClass}>
        <MuiProvider>
          <Navbar params={fakeParams} />
          <main>
            <PrimarySection style={{ textAlign: 'center' }}>
              <Typography
                variant='h1'
                textAlign='center'
                color='var(--primary-dark)'
              >
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
          </main>
          <Footer params={fakeParams} />
        </MuiProvider>
      </body>
    </html>
  );
};

export default Error404;
