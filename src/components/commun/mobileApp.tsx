'use client';
import React from 'react';
import { Box, Button, Modal, Paper, Stack } from '@mui/material';
import { Android, Apple } from '@mui/icons-material';

export const MobileAppButton: React.FC<{ label: string }> = ({ label }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <Button
        color='secondary'
        variant='contained'
        onClick={() => setModalOpen(true)}
        aria-label={label}
      >
        {label}
      </Button>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className={'modal-apps'}
      >
        <Paper className={'modal-content'}>
          <Box className={'modal-body'}>
            <Stack spacing={[5, 5]} direction={['column', 'row']}>
              <Button
                color='secondary'
                variant='contained'
                href='https://apps.apple.com/fr/app/devfest-nantes/id6443489706'
                aria-label='iOS app'
                target={'_blank'}
                startIcon={<Apple />}
              >
                iOS
              </Button>
              <Button
                color='secondary'
                variant='contained'
                href='https://play.google.com/store/apps/details?id=com.gdgnantes.devfest.mobile.androidapp&pcampaignid=web_share'
                aria-label='Android app'
                target={'_blank'}
                startIcon={<Android />}
              >
                Android
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
