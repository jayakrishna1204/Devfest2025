import { PrimarySection } from '@/components/commun/section/sectionType';
import { FC, PropsWithChildren } from 'react';

export const MDXPage: FC<PropsWithChildren> = ({ children }) => {
  return <PrimarySection>{children}</PrimarySection>;
};
