import React from 'react';
import Image from 'next/image';

export const Flag: React.FC<{
  lang: 'English' | 'French' | 'fr' | 'en';
  size?: 'medium' | 'small' | 'tiny';
}> = async ({ lang, size = 'medium' }) => {
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
      src={await import('@/images/flags/' + flagname + '.svg')}
      {...sizes}
      style={{
        objectFit: 'cover',
        verticalAlign: 'middle',
      }}
    />
  );
};
