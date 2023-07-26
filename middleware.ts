import {withAuth} from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
 
const locales = [
    'en', 
    'ru'
];

/*
domains: [
    {
      domain: 'us.example.com',
      defaultLocale: 'en',
      // Optionally restrict the locales managed by this domain. If this
      // domain receives requests for another locale (e.g. us.example.com/fr),
      // then the middleware will redirect to a domain that supports it.
      locales: ['en']
    },
    {
      domain: 'ca.example.com',
      defaultLocale: 'en'
      // If there are no `locales` specified on a domain,
      // all global locales will be supported here.
    }
  ]
*/

const publicPages = [
    '/', 
    '/login', 
    '/terms', 
    '/privacy', 
    '/register'
];
 
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'never'
});
 
const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({token}) => token != null
    },
    pages: {
      signIn: '/login',
    }
  }
);
 
export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
 
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};