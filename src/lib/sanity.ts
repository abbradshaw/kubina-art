import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'nkk069k5',
  dataset: 'production',
  apiVersion: '2026-09-30',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source: any) => builder.image(source)

export const artworkSrc = (image: any, width: number) =>
  urlFor(image).width(width).auto('format').quality(80).url()
