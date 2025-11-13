// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/lib/i18n/config";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static files, images, API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // 2. Locale detection: check if URL already starts with /en, /so, or /ar
  const hasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Redirect `/` → `/en`
  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${i18n.defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // 3. Handle Supabase session updates
  const response = await updateSession(request);

  return response;
}

export const config = {
  matcher: [
    // match all routes except next/image/static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
