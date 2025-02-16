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
import { Flag } from '@/components/commun/flags';

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
      <Topbar toggleDrawer={toggleDrawer} logo='/images/logo-long.svg'>
        {children}
      </Topbar>

      <DrawerMenu isOpen={isOpen} toggleDrawer={toggleDrawer}>
        {children}
      </DrawerMenu>
    </>
  );
};

const Topbar: React.FC<
  React.PropsWithChildren<{
    toggleDrawer: ToggleDrawerType;
    logo: string;
  }>
> = ({ children, toggleDrawer, logo }) => {
  return (
    <AppBar position='sticky' color='secondary'>
      <Toolbar className='toolbar'>
        <Box className='top-bar-left'>
          <MyLink href='/'>
            <Image
              className='logo-top-bar'
              src={logo}
              alt='Logo Devfest'
              height='64'
              width='226'
            />
          </MyLink>
        </Box>

        <Box className='top-bar-right'>
          <List className='menu-desktop'>{children}</List>
          <IconButton
            className='drawer'
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
    className='drawer'
    anchor='top'
    variant='temporary'
    open={isOpen}
    onClose={toggleDrawer(false)}
  >
    <Box
      className='menu-mobile'
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
    >
      <Flag lang={targetLocale} />
    </Link>
  );
};
