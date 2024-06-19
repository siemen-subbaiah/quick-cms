import { auth } from '@/auth';

export default auth((req) => {
  if (
    req.nextUrl.pathname === '/' ||
    (req.nextUrl.pathname === '/test-user' && req.auth)
  ) {
    return Response.redirect(new URL('/app', req.url));
  }

  if (req.nextUrl.pathname.includes('/app') && !req.auth) {
    return Response.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
