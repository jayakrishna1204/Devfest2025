import { MyComponent } from '@/types';
import { notFound } from 'next/navigation';

const Error404: MyComponent = async () => {
  notFound();
};

export default Error404;
