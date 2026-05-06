import { NextResponse, NextRequest } from 'next/server'
import { i18n } from './i18n-config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
    const locales: string[] = i18n.locales as unknown as string[]
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
    const locale = matchLocale(languages, locales, i18n.defaultLocale)
    return locale
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml' ||
        pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|xml|txt)$/)
    ) {
        return
    }

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
        )
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
