import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About the Artist')
        .child(S.document().schemaType('about').documentId('about-page')),
      S.divider(),
      S.documentTypeListItem('work').title('Artworks'),
    ])
