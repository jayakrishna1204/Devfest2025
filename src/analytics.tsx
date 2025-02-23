import Script from 'next/script';

const Analytics = () => {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }
  return (
    <Script
      async
      src='https://cloud.umami.is/script.js'
      data-website-id='3962f1f9-2780-4bb2-ad18-bf194b8a4708'
    />
  );
};
