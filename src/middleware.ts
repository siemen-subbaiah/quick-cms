import { auth } from '@/auth';

export default auth((req) => {
  if (req.nextUrl.pathname === '/' && req.auth) {
    return Response.redirect(new URL('/app', req.url));
  }

  if (req.nextUrl.pathname === '/app' && !req.auth) {
    return Response.redirect(new URL('/', req.url));
  }
});
