'use client';

import React from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
} from '@mui/material';
import { MyLink } from '@/components/commun/link';
import { CloseRounded, MenuRounded } from '@mui/icons-material';
import Image from 'next/image';
import './navbar.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoDevfest from '@/images/logo-blanc.png';
import { Flag } from '@/components/commun/flags';
import { DesktopOnlySx, MobileOnlySx } from '@/layout/theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ToggleDrawerType = (openTarget: boolean) => (event: any) => void;

export const MenuNavbar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setDrawerOpen] = React.useState(false);
  const pathname = usePathname().replace(/^\/en\/?/, '/');

  const toggleDrawer: ToggleDrawerType = (openTarget) => (event) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(openTarget);
  };

  React.useEffect(() => {
    document.querySelectorAll('.menu-item').forEach((item) => {
      item.classList.remove('active-link');
      if (pathname.replace(/^\/en\//, '/') === item.getAttribute('href')) {
        item.classList.add('active-link');
      }
    });
  }, [pathname]);

  return (
    <>
      <Topbar toggleDrawer={toggleDrawer}>{children}</Topbar>

      <DrawerMenu isOpen={isOpen} toggleDrawer={toggleDrawer}>
        {children}
      </DrawerMenu>
    </>
  );
};

const Topbar: React.FC<
  React.PropsWithChildren<{
    toggleDrawer: ToggleDrawerType;
  }>
> = ({ children, toggleDrawer }) => {
  return (
    <AppBar position='sticky'>
      <Toolbar className='toolbar'>
        <Box className='top-bar-left'>
          <MyLink href='/'>
            <Image
              className='logo-top-bar'
              src={LogoDevfest}
              alt='Logo Devfest'
              style={{ width: '100px', height: 'auto' }}
            />
          </MyLink>
        </Box>

        <Box sx={DesktopOnlySx} className='top-bar-right menu-desktop'>
          <List>{children}</List>
        </Box>
        <Box sx={MobileOnlySx} className='top-bar-right'>
          <IconButton
            edge='start'
            aria-label='open menu'
            onClick={toggleDrawer(true)}
          >
            <MenuRounded />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const DrawerMenu: React.FC<
  React.PropsWithChildren<{
    toggleDrawer: ToggleDrawerType;
    isOpen: boolean;
  }>
> = ({ children, isOpen, toggleDrawer }) => (
  <Drawer
    sx={MobileOnlySx}
    anchor='top'
    variant='temporary'
    open={isOpen}
    onClose={toggleDrawer(false)}
  >
    <Box
      role='presentation'
      onKeyDown={toggleDrawer(true)}
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton
          style={{
            height: '50px',
            justifyContent: 'end',
            marginRight: '20px',
          }}
        >
          <IconButton aria-label='close menu'>
            <CloseRounded />
          </IconButton>
        </ListItemButton>
        <Divider />
        {children}
      </List>
    </Box>
  </Drawer>
);

export const ToggleLanguage: React.FC<{ locale: string }> = ({ locale }) => {
  const targetLocale = locale == 'en' ? 'fr' : 'en';
  return (
    <Link
      href='#'
      onClick={() => {
        document.cookie = `NEXT_LOCALE=${targetLocale}; path=/`;
        location.reload();
      }}
      style={{ width: '100%', textAlign: 'center' }}
    >
      <Flag lang={targetLocale} />
    </Link>
  );
};
