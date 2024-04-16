import type { KirbyQuerySchema } from '#nuxt-kql'

export const siteQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    title: true,
    description: true,
    children: {
      query: 'site.children',
      select: ['id', 'title', 'isListed'],
    },
    address: 'site.address.kt',
    email: 'site.email',
    phone: 'site.phone',
    social: 'site.social.toStructure',
    months: 'site.eventMonths.split',
    season: 'site.season',
    calendar: 'kirby.collection("program")',
  },
}
