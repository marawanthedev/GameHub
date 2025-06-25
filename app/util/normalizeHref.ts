export function normalizeHrefWithLocale(href: string, locale: string): string {
    if (!href.startsWith('/')) href = '/' + href

    const regex = new RegExp(`^/${locale}(/|$)`)
    if (regex.test(href)) {
        return href
    }

    return `/${locale}${href}`
}
