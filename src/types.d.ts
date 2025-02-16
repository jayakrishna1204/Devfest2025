import React from 'react';

export type MyComponent<T = {}> = React.FC<
  React.PropsWithChildren<CommonParams<T>>
>;

export type CommonParams<T = {}> = { params: Promise<{ locale: string } & T> };
