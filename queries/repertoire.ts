import type { KirbyQueryResponse, KirbyQuerySchema } from '#nuxt-kql'

export type KirbyEventData = {
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

export type KirbyRepertoireResponse = KirbyQueryResponse<KirbyRepertoireData>

export const repertoireQuery: KirbyQuerySchema = {
  query: 'page("repertoire").children.listed',
  select: {
    uri: true,
    id: true,
    uid: true,
    title: true,
    category: true,
    uuid: true,
    cover: {
      query: 'page.cover.toFile?.resize(1200)',
      select: ['width', 'height', 'url', 'alt', 'srcset'],
    },
  },
}
