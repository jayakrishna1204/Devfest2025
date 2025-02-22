import React from 'react';
import Image from 'next/image';
import FlagFR from '@/images/flags/fr.svg';
import FlagEN from '@/images/flags/en.svg';

export const Flag: React.FC<{
  lang: 'English' | 'French' | 'fr' | 'en';
  size?: 'medium' | 'small' | 'tiny';
}> = ({ lang, size = 'medium' }) => {
  const flagname = lang.toLowerCase().startsWith('f') ? 'fr' : 'en';

  const sizes =
    size == 'medium'
      ? { height: 18, width: 24 }
      : size == 'tiny'
        ? { height: 12, width: 16 }
        : { height: 14, width: 19 };

  return (
    <Image
      alt='logo'
      src={flagname == 'fr' ? FlagFR : FlagEN}
      {...sizes}
      style={{
        objectFit: 'cover',
        verticalAlign: 'middle',
      }}
    />
  );
};
