import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token && pathname !== '/login') return NextResponse.redirect(new URL('/login', request.url));
  else if (token && pathname !== '/') return NextResponse.redirect(new URL('/', request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.png$).*)']
};
