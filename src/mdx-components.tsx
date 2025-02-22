import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { MyLink } from '@/components/commun/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: async (props) => {
      return <Image alt='image' {...props} loading='lazy' />;
    },
    h1: (props) => <Typography variant='h1' {...props} />,
    h2: (props) => <Typography variant='h2' {...props} />,
    h3: (props) => <Typography variant='h3' {...props} />,
    h4: (props) => <Typography variant='h4' {...props} />,
    h5: (props) => <Typography variant='h5' {...props} />,
    h6: (props) => <Typography variant='h6' {...props} />,
    a: (props) => <MyLink {...props} className='md-link' />,
  };
}
