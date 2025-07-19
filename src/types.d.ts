import React from 'react';

export type MyComponent<T = unknown> = React.FC<
  React.PropsWithChildren<CommonParams<T>>
>;

export type CommonParams<T = unknown, TParam = unknown> = {
  params: Promise<{ locale: string } & TParam>;
} & T;
