// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE FIRST — every phone, address and link on the
//  site comes from here. The values below are placeholders.
// ─────────────────────────────────────────────────────────────
export const COMPANY = {
  name: 'Miranoir Mermer',
  legalName: 'Miranoir Mermer',
  founded: 2024,
  area: 'Sultanbeyli / İstanbul', // short location shown in the top bar
  address: 'Battalgazi Mah. Çilekeş Sok. No: 5, Sultanbeyli / İstanbul',
  mapsQuery: 'Battalgazi Mahallesi Çilekeş Sokak No 5 Sultanbeyli İstanbul',
  phones: ['+90 552 360 21 03'],
  whatsapp: '905523602103', // digits only, with country code, no +
  email: 'miranoir.design@gmail.com',
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    pinterest: 'https://pinterest.com/',
  },
}

export const telHref = (p) => 'tel:' + p.replace(/[^\d+]/g, '')
export const whatsappHref = (text = '') =>
  `https://wa.me/${COMPANY.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`

// Catalogue collections, in menu order (same order as the PDF catalogue).
// Labels and descriptions are in src/i18n.js under "col.<key>" / "cold.<key>".
// "material" is filled in automatically for every stone in that collection.
export const COLLECTIONS = [
  { key: 'beyaz', material: 'mermer', cover: '/catalog/calacatta-oro.jpg' },
  { key: 'siyah', material: 'mermer', cover: '/catalog/sahara-noir.jpg' },
  { key: 'gri', material: 'mermer', cover: '/catalog/galaxy-oro.jpg' },
  { key: 'renkli', material: 'mermer', cover: '/catalog/rain-forest-green.jpg' },
  { key: 'oniks', material: 'oniks', cover: '/catalog/blue-onyx.jpg' },
  { key: 'anatolia', material: 'porselen', brand: 'Anatolia', cover: '/catalog/anatolia-calacatta-viola.jpg' },
  { key: 'lamar', material: 'porselen', brand: 'Lamar', cover: '/catalog/lamar-white-laurent.jpg' },
  { key: 'coante', material: 'kuvars', brand: 'Coante', cover: '/catalog/coante-thunder.jpg' },
]
export const COLLECTION_KEYS = COLLECTIONS.map((c) => c.key)
export const collectionOf = (key) => COLLECTIONS.find((c) => c.key === key)

// Material labels are in src/i18n.js under "mat.<key>"
export const MATERIALS = ['mermer', 'oniks', 'porselen', 'kuvars']

// Brands shown in the logo strip (the brand series in the catalogue)
export const BRANDS = ['Anatolia', 'Lamar', 'Coante']

// Application areas, in menu order. Labels/descriptions are in src/i18n.js
// under "app.<key>" and "appd.<key>"; the picture for each is in AREA_IMAGES.
export const APPLICATIONS = ['merdiven', 'denizlik', 'zemin', 'tezgah', 'duvar', 'tv', 'somine', 'supurgelik', 'villa', 'mobilya']

export const AREA_IMAGES = {
  merdiven: '/projects2/stairs-twilight.jpg',
  denizlik: '/catalog/thassos.jpg',
  zemin: '/projects2/floor-viola.jpg',
  tezgah: '/projects2/kitchen-panda.jpg',
  duvar: '/projects2/living-grizio.jpg',
  tv: '/projects2/tv-galaxy-oro.jpg',
  somine: '/projects2/fireplace-green.jpg',
  supurgelik: '/catalog/pietra-grey.jpg',
  villa: '/projects2/pool-verde-karzai.jpg',
  mobilya: '/projects2/table-panda.jpg',
}
