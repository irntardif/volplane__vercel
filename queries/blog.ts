import type { KirbyQueryResponse, KirbyQuerySchema } from '#nuxt-kql'

export type KirbyArticleData = {
  uri: string
  uid: string
  title: string
  category: string
  cover?: {
    width: number
    height: number
    srcset: string
    url: string
    alt: string
  }
}[]

export type KirbyBlogResponse = KirbyQueryResponse<KirbyBlogData>

export const blogQuery: KirbyQuerySchema = {
  query: 'page("blog").children.listed',
  select: {
    uri: true,
    id: true,
    uid: true,
    title: true,
    category: true,
    uuid: true,
    categories: 'page.parent.categories.yaml',
    cover: {
      query: 'page.cover.toFile?.resize(1200)',
      select: ['width', 'height', 'url', 'alt', 'srcset'],
    },
  },
}

export const eventQuery: KirbyQuerySchema = {
  query: 'page("blog").children.listed.filterBy("date")',
  select: {
    uri: true,
    id: true,
    uid: true,
    title: true,
    category: true,
    uuid: true,
    categories: 'page.parent.categories.yaml',
    cover: {
      query: 'page.cover.toFile?.resize(1200)',
      select: ['width', 'height', 'url', 'alt', 'srcset'],
    },
  },
}