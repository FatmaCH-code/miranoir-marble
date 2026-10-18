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
    instagram: 'https://www.instagram.com/miranoirmarble',
    facebook: '', // leave empty to hide the icon
    pinterest: '',
  },
}

// ─── Quote form → email ──────────────────────────────────────
// Every quote request is emailed to QUOTE_EMAIL.to (and still saved in the
// admin panel / Supabase). Two free services are supported:
//   • 'formsubmit' (default): no account. The FIRST request sends a
//     confirmation email to this address — click "Activate Form" in it once.
//   • 'web3forms': create a free access key at web3forms.com with this
//     email, paste it in web3formsKey, and set provider to 'web3forms'.
// Set provider to '' to turn email off.
export const QUOTE_EMAIL = {
  to: 'miranoir.design@gmail.com', // change to your professional address
  provider: 'formsubmit',
  web3formsKey: '',
}

export const telHref = (p) => 'tel:' + p.replace(/[^\d+]/g, '')
export const whatsappHref = (text = '') =>
  `https://wa.me/${COMPANY.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`

// Collections, in menu order, in three groups:
//   dogal    — the natural stone collections from the Miranoir PDF catalogue
//   kuvars   — quartz brands
//   porselen — porcelain slab brands
// Labels/descriptions for the natural ones are in src/i18n.js ("col.<key>",
// "cold.<key>"); brand collections just use the brand name.
// "catalogQuery" is what the "brand catalogue" button searches for.
// To add a brand: add a line here, then add its stones in the admin panel.
const brand = (key, name, material, catalogQuery, cover) => ({ key, group: material, material, brand: name, catalogQuery, cover })
export const COLLECTIONS = [
  { key: 'beyaz', group: 'dogal', material: 'mermer', cover: '/catalog/calacatta-oro.jpg' },
  { key: 'siyah', group: 'dogal', material: 'mermer', cover: '/catalog/sahara-noir.jpg' },
  { key: 'gri', group: 'dogal', material: 'mermer', cover: '/catalog/galaxy-oro.jpg' },
  { key: 'renkli', group: 'dogal', material: 'mermer', cover: '/catalog/rain-forest-green.jpg' },
  { key: 'oniks', group: 'dogal', material: 'oniks', cover: '/catalog/blue-onyx.jpg' },
  brand('coante', 'Coante', 'kuvars', 'Coante kuvars katalog', '/catalog/coante-thunder.jpg'),
  brand('belenco', 'Belenco', 'kuvars', 'Belenco kuvars katalog'),
  brand('cimstone', 'Çimstone', 'kuvars', 'Çimstone kuvars katalog'),
  brand('quamond', 'Quamond', 'kuvars', 'Quamond kuvars katalog'),
  brand('anatolia', 'Anatolia', 'porselen', 'Anatolia porselen levha katalog', '/catalog/anatolia-calacatta-viola.jpg'),
  brand('lamar', 'Lamar', 'porselen', 'Lamar porselen levha katalog', '/catalog/lamar-white-laurent.jpg'),
  brand('ng', 'NG Porselen', 'porselen', 'NG porselen levha katalog'),
  brand('kutahya', 'Kütahya Porselen', 'porselen', 'Kütahya porselen levha katalog'),
  brand('bien', 'Bien Porselen', 'porselen', 'Bien porselen levha katalog'),
  brand('neolith', 'Neolith', 'porselen', 'Neolith porselen levha katalog'),
  brand('kale', 'Kale Porselen', 'porselen', 'Kale porselen levha katalog'),
]
export const GROUPS = ['dogal', 'kuvars', 'porselen']
export const COLLECTION_KEYS = COLLECTIONS.map((c) => c.key)
export const collectionOf = (key) => COLLECTIONS.find((c) => c.key === key)
export const catalogSearchHref = (c) => `https://www.google.com/search?q=${encodeURIComponent(c.catalogQuery)}`

// Material labels are in src/i18n.js under "mat.<key>"
export const MATERIALS = ['mermer', 'oniks', 'porselen', 'kuvars']

// Brands shown in the logo strip
export const BRANDS = COLLECTIONS.filter((c) => c.brand)

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
