// middleware.ts
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const languages = await kv.hget(request.nextUrl.hostname, "languages");
  const pathnameIsMissingLocale = (Array.isArray(languages) ? languages : ["en"]).some(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  const { geo, ip, headers } = request;

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${"en"}/${pathname}${request.nextUrl.search}`, request.url));
  }

  const response = NextResponse.next();
  const language = headers.get("accept-language");
  const { city, country, latitude, longitude, region } = geo || {};

  response.cookies.set(
    "device",
    JSON.stringify({
      ...(city && { city }),
      ...(country && {
        country,
      }),
      ...(latitude && { latitude }),
      ...(longitude && { longitude }),
      ...(region && { region }),
      ...(ip && { ip }),
      ...(language && { local: language.split(",")[0] || "en" }),
    })
  );

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - en (English pages) but allow /en/signup
     * - zh (Chinese pages) but allow /zh/signup
     */
    "/((?!api|_next/static|_next/image|fonts|images|favicon.ico|en|zh|.headless|.well-known).*)",
  ],
};
