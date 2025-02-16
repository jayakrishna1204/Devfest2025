import { headers } from 'next/headers';
import { NextMiddleware, NextResponse } from 'next/server';

export async function getPathname(): Promise<string> {
  const _headers = await headers();
  console.log('headers', _headers);
  return _headers.get('x-current-path') || '/';
}

export function stackMiddlewares(
  functions: MiddlewareFactory[] = [],
  index = 0
): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
