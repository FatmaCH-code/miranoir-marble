// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE FIRST — every phone, address and link on the
//  site comes from here. The values below are placeholders.
// ─────────────────────────────────────────────────────────────
export const COMPANY = {
  name: 'Miranoir Marble',
  legalName: 'Miranoir Mermer Ltd. Şti.',
  founded: 2024,
  city: 'İstanbul',
  address: 'Mermerciler Sanayi Sitesi, 00. Sokak No: 0, İstanbul, Türkiye',
  mapsQuery: 'Mermerciler Sanayi Sitesi İstanbul', // what the embedded Google map searches for
  phones: ['+90 500 000 00 00', '+90 500 000 00 01'],
  whatsapp: '905000000000', // digits only, with country code, no +
  email: 'info@miranoir.com',
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    pinterest: 'https://pinterest.com/',
  },
}

export const telHref = (p) => 'tel:' + p.replace(/[^\d+]/g, '')
export const whatsappHref = (text = '') =>
  `https://wa.me/${COMPANY.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`

// Materials, in menu order. Labels are in src/i18n.js under "mat.<key>".
export const MATERIALS = ['mermer', 'granit', 'kuvars', 'porselen']

// Brands shown in the product filters and the logo strip.
// Only list brands you actually supply.
export const BRANDS = {
  kuvars: ['Belenco', 'Calisco', 'Çimstone', 'Coante', 'Silestone'],
  porselen: ['Lamar', 'NG Stone', 'Anatolia', 'Bien', 'Dekton', 'Infinity', 'Laminam', 'Neolith', 'T-One'],
}

export const APPLICATIONS = ['mutfak', 'banyo', 'diger']
