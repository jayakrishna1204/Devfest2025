import Link, { LinkProps } from 'next/link';
import React from 'react';

type IMyLink = React.FC<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps & {
      children?: React.ReactNode | undefined;
      href: string;
    } & React.RefAttributes<HTMLAnchorElement>
>;

export const MyLink: IMyLink = ({ children, href, ...props }) => {
  return (
    <Link
      href={href}
      target={href.startsWith('http') ? '_blank' : ''}
      {...props}
    >
      {children}
    </Link>
  );
};
