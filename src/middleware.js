import { NextResponse } from 'next/server';

const locales = ['en', 'fr', 'nl'];
const defaultLocale = 'en';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to default locale if no locale in URL
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
