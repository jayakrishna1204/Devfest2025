import React from 'react';

import { MENU } from '@/layout/navbar/menu';
import { ListItemButton, ListItemText } from '@mui/material';
import { MyLink } from '@/components/commun/link';
import './navbar.scss';
import { getTranslation } from '@/i18n/i18n';
import { MyComponent } from '@/types';
import { MenuNavbar } from '@/layout/navbar/menu-navbar';

export const Navbar: MyComponent = async ({ params }) => {
  return (
    <MenuNavbar locale={(await params).locale}>
      <ListMenuButtons params={params} />
    </MenuNavbar>
  );
};

const ListMenuButtons: MyComponent = async ({ params }) => {
  const t = await getTranslation(params, 'pages');

  return (
    <>
      {MENU.map((menuItem) => (
        <MyLink
          key={menuItem.label}
          href={menuItem.link}
          className={`menu-item`}
          style={{ width: '100%', height: '100%' }}
        >
          <ListItemButton>
            <ListItemText sx={{ textAlign: 'center' }}>
              {t(menuItem.label + '.name', { defaultValue: menuItem.label })}
            </ListItemText>
          </ListItemButton>
        </MyLink>
      ))}
    </>
  );
};
