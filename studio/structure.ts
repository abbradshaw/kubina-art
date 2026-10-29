import type {StructureResolver} from 'sanity/structure'
import HelpContent from './components/HelpContent'
import StartHere from './components/StartHere'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Peter Kubina Art — Editor Menu')
    .items([
      S.listItem()
        .title('⭐ Start here — What do you want to do?')
        .icon(() => '⭐')
        .child(S.component().title('Start here').component(StartHere)),
      S.divider(),
      S.listItem()
        .title('How to Use This Editor')
        .icon(() => '❓')
        .child(S.component().title('Quick Help Guide').component(HelpContent)),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(
          S.documentList()
            .title('Site Settings')
            .schemaType('settings')
            .filter('_type == "settings"')
            .child((id) => S.document().schemaType('settings').documentId(id))
        ),
      S.divider(),
      S.listItem()
        .title('About the Artist')
        .icon(() => '👤')
        .child(
          S.documentList()
            .title('About Peter Kubina')
            .schemaType('about')
            .filter('_id == "about-page"')
            .child((id) => S.document().schemaType('about').documentId(id))
        ),
      S.divider(),
      S.listItem()
        .title('All Artworks')
        .icon(() => '🖼️')
        .child(
          S.documentTypeList('work')
            .title('All Artworks — newest first')
            .defaultOrdering([{field: 'year', direction: 'desc'}])
        ),
      S.divider(),
      S.listItem()
        .title('Browse by Category')
        .icon(() => '📂')
        .child(
          S.list().title('Categories').items([
            categoryItem(S, 'Paintings', 'Painting'),
            categoryItem(S, 'Drawings', 'Drawing'),
            categoryItem(S, 'Sculptures', 'Sculpture'),
            categoryItem(S, 'Digital', 'Digital'),
          ])
        ),
      S.listItem()
        .title('Browse by Status')
        .icon(() => '🏷️')
        .child(
          S.list().title('Status').items([
            statusItem(S, 'Available', 'available'),
            statusItem(S, 'On Hold', 'on-hold'),
            statusItem(S, 'Sold', 'sold'),
            statusItem(S, 'Private Collection', 'private'),
          ])
        ),
    ])

function categoryItem(S: any, title: string, category: string) {
  return S.listItem().title(title).child(
    S.documentTypeList('work').title(title)
      .filter('_type == "work" && category == $category')
      .params({category})
      .defaultOrdering([{field: 'year', direction: 'desc'}])
  )
}

function statusItem(S: any, title: string, status: string) {
  return S.listItem().title(title).child(
    S.documentTypeList('work').title(title)
      .filter('_type == "work" && status == $status')
      .params({status})
      .defaultOrdering([{field: 'year', direction: 'desc'}])
  )
}
