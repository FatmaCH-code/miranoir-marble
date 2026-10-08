import { create } from 'zustand'

const dict = {
  tr: {
    'nav.home': 'Anasayfa', 'nav.products': 'Ürünler', 'nav.applications': 'Uygulamalar',
    'nav.about': 'Hakkımızda', 'nav.blog': 'Blog', 'nav.contact': 'İletişim', 'nav.quote': 'Teklif al',
    'nav.allProducts': 'Tüm ürünler', 'nav.allApps': 'Tüm uygulamalar', 'nav.menu': 'Menü',
    'mat.mermer': 'Mermer', 'mat.granit': 'Granit', 'mat.kuvars': 'Kuvars', 'mat.porselen': 'Porselen',
    'app.mutfak': 'Mutfak tezgahı', 'app.banyo': 'Banyo tezgahı', 'app.diger': 'Diğer uygulamalar',
    'tone.light': 'Açık', 'tone.dark': 'Koyu', 'tone.warm': 'Sıcak',

    'hero.title': 'Doğanın en sakin yüzeyleri, mutfağınızda ve banyonuzda.',
    'hero.body': 'Mermer, granit, kuvars ve porselen tezgahları ölçüden montaja kadar biz hazırlıyoruz. Taşı birlikte seçiyor, işçiliğini kendi atölyemizde yapıyoruz.',
    'hero.cta': 'Taşları inceleyin', 'hero.cta2': 'Ücretsiz teklif alın',

    'home.counters.title': 'Mutfak & banyo tezgahları',
    'home.counters.body': 'Kullanım alanınıza uygun taşı seçmenize yardımcı oluyor, kesim ve cilayı titizlikle yapıyoruz.',
    'home.apps.title': 'Uygulamalarımız',
    'home.apps.body': 'Ücretsiz mimari destek ve projelendirme. Her projede aynı özen.',
    'home.apps.cta': 'Yaptığımız işler',
    'home.featured.title': 'Seçkin taşlar',
    'home.featured.body': 'Showroomumuzda en çok sorulan yüzeyler. Her birinin numunesini görmeye gelebilirsiniz.',
    'home.browse.title': 'Malzemeye göre inceleyin',
    'home.browse.body': 'Dört malzeme, onlarca renk ve damar. Size en uygun olanı birlikte bulalım.',
    'home.process.title': 'Hizmet sürecimiz',
    'home.process.body': 'Teklif almadan teslimata kadar her adım şeffaf ilerler.',
    'home.brands.title': 'Çalıştığımız markalar',
    'home.count': '{n} çeşit',

    'step1.t': 'Ön keşif ve ölçü', 'step1.b': 'Mutfak veya banyonuzun yaklaşık ölçülerini bize iletin; doğru fiyat için bu yeterli.',
    'step2.t': 'Teklif ve onay', 'step2.b': 'Ölçülere ve seçtiğiniz taşa göre net bir fiyat teklifi hazırlıyoruz.',
    'step3.t': 'Kesin ölçü ve üretim', 'step3.b': 'Onayınızdan sonra ekibimiz yerinde kesin ölçü alır, üretim atölyemizde başlar.',
    'step4.t': 'Montaj ve teslim', 'step4.b': 'Tezgahınız ortalama 7 iş gününde monte edilir ve kullanıma hazır teslim edilir.',

    'products.title': 'Ürünler', 'products.body': 'Tüm taşlarımız. Malzemeye, markaya veya tona göre süzebilirsiniz.',
    'products.all': 'Tümü', 'products.brand': 'Marka', 'products.tone': 'Ton', 'products.search': 'Taş ara',
    'products.empty': 'Bu seçimle eşleşen taş yok. Filtreleri temizleyip tekrar deneyin.',
    'products.clear': 'Filtreleri temizle', 'products.loading': 'Taşlar yükleniyor…',

    'stone.material': 'Malzeme', 'stone.brand': 'Marka / köken', 'stone.finish': 'Yüzey',
    'stone.thickness': 'Kalınlık', 'stone.tone': 'Ton', 'stone.quote': 'Bu taş için teklif alın',
    'stone.whatsapp': "WhatsApp'tan sorun", 'stone.back': 'Ürünlere dön', 'stone.related': 'Benzer taşlar',
    'stone.notFound': 'Bu taşı bulamadık. Katalogdan kaldırılmış olabilir.',
    'stone.note': 'Ekran renkleri taşın gerçek tonundan farklı olabilir. Numuneyi showroomumuzda görebilirsiniz.',
    'stone.waText': 'Merhaba, {name} hakkında bilgi almak istiyorum.',

    'apps.title': 'Uygulamalar', 'apps.body': 'Tamamladığımız mutfak, banyo ve özel projelerden bir seçki.',
    'apps.all': 'Tümü',

    'about.title': 'Hakkımızda',
    'about.lead': 'Miranoir, taşın kendi karakterini öne çıkaran sade işçilik fikriyle kuruldu.',
    'about.p1': 'Adımızı Nero Marquina\'nın siyahından ve beyaz damarlarından aldık: koyu bir zeminde ışığı yakalayan çizgiler. Her projede aradığımız şey bu dengedir.',
    'about.p2': 'Mermer, granit, kuvars ve porselen tezgahları kendi atölyemizde kesip cilalıyoruz. Ölçüyü alan, üretimi takip eden ve montajı yapan ekip aynıdır; böylece sorumluluk hiçbir adımda el değiştirmez.',
    'about.p3': 'Taş seçerken acele etmenizi istemeyiz. Numuneleri showroomumuzda gün ışığında görebilir, kullanım alışkanlıklarınıza en uygun malzemeyi birlikte seçebiliriz.',
    'about.v1.t': 'Taşı birlikte seçeriz', 'about.v1.b': 'Mutfağınızın ışığına ve kullanımınıza göre öneri sunarız.',
    'about.v2.t': 'Kendi atölyemiz', 'about.v2.b': 'Kesim, pah ve cila tek çatı altında yapılır.',
    'about.v3.t': 'Tek ekip', 'about.v3.b': 'Ölçüden montaja kadar aynı ekip sizinle ilgilenir.',

    'blog.title': 'Blog', 'blog.body': 'Taş seçimi, bakım ve uygulama üzerine notlar.',
    'blog.read': 'Yazıyı okuyun', 'blog.back': 'Tüm yazılar', 'blog.notFound': 'Bu yazıyı bulamadık.',

    'contact.title': 'İletişim', 'contact.body': 'Ölçülerinizi ve tercih ettiğiniz taşı yazın, aynı gün içinde size dönelim.',
    'contact.phone': 'Telefon', 'contact.email': 'E-posta', 'contact.address': 'Adres', 'contact.social': 'Sosyal medya',
    'contact.directions': 'Yol tarifi alın',

    'form.title': 'Teklif formu', 'form.name': 'Ad soyad', 'form.phone': 'Telefon', 'form.email': 'E-posta',
    'form.application': 'Uygulama alanı', 'form.stone': 'İlgilendiğiniz taş', 'form.stoneAny': 'Henüz karar vermedim',
    'form.size': 'Yaklaşık ölçü', 'form.sizeHint': 'Örn. L mutfak, 3,2 m + 1,8 m',
    'form.message': 'Notunuz', 'form.send': 'Teklif iste', 'form.sending': 'Gönderiliyor…',
    'form.sent.t': 'Talebiniz alındı', 'form.sent.b': 'En kısa sürede {phone} numarası üzerinden size döneceğiz.',
    'form.again': 'Yeni talep gönder', 'form.required': 'Ad ve telefon zorunludur.',
    'form.optional': 'isteğe bağlı',

    'footer.tagline': 'Mermer, granit, kuvars ve porselen tezgah uygulamaları.',
    'footer.links': 'Sayfalar', 'footer.contact': 'İletişim', 'footer.rights': 'Tüm hakları saklıdır.',
    'wa.label': "WhatsApp'tan yazın", 'wa.text': 'Merhaba, web siteniz üzerinden ulaşıyorum.',
    'lang.switch': 'English',

    'admin.title': 'Yönetim', 'admin.login': 'Giriş yap', 'admin.logout': 'Çıkış',
    'admin.email': 'E-posta', 'admin.password': 'Şifre', 'admin.demo': 'Demo modu — veriler yalnızca bu tarayıcıda saklanır. Giriş: {email} / {password}',
    'admin.stones': 'Taşlar', 'admin.quotes': 'Teklif talepleri', 'admin.add': 'Taş ekle', 'admin.edit': 'Düzenle',
    'admin.delete': 'Sil', 'admin.confirmDelete': '"{name}" silinsin mi?', 'admin.save': 'Kaydet', 'admin.cancel': 'Vazgeç',
    'admin.name': 'Ad', 'admin.slug': 'Adres (slug)', 'admin.descTr': 'Açıklama (TR)', 'admin.descEn': 'Açıklama (EN)',
    'admin.featured': 'Anasayfada göster', 'admin.active': 'Sitede yayında', 'admin.photos': 'Fotoğraflar',
    'admin.upload': 'Fotoğraf yükle', 'admin.uploading': 'Yükleniyor…', 'admin.noQuotes': 'Henüz teklif talebi yok.',
    'admin.export': 'CSV indir', 'admin.reset': 'Demo verisini sıfırla', 'admin.viewSite': 'Siteyi görüntüle',
    'admin.status.new': 'Yeni', 'admin.status.contacted': 'Arandı', 'admin.status.won': 'Anlaşıldı', 'admin.status.lost': 'Olumsuz',
    'admin.hidden': 'gizli', 'admin.saved': 'Kaydedildi',
  },
  en: {
    'nav.home': 'Home', 'nav.products': 'Products', 'nav.applications': 'Projects',
    'nav.about': 'About', 'nav.blog': 'Journal', 'nav.contact': 'Contact', 'nav.quote': 'Get a quote',
    'nav.allProducts': 'All products', 'nav.allApps': 'All projects', 'nav.menu': 'Menu',
    'mat.mermer': 'Marble', 'mat.granit': 'Granite', 'mat.kuvars': 'Quartz', 'mat.porselen': 'Porcelain',
    'app.mutfak': 'Kitchen countertops', 'app.banyo': 'Bathroom vanities', 'app.diger': 'Other projects',
    'tone.light': 'Light', 'tone.dark': 'Dark', 'tone.warm': 'Warm',

    'hero.title': "Nature's calmest surfaces, made for your kitchen and bath.",
    'hero.body': 'We prepare marble, granite, quartz and porcelain countertops from first measurement to installation. We choose the stone with you and do the craftsmanship in our own workshop.',
    'hero.cta': 'Browse the stones', 'hero.cta2': 'Get a free quote',

    'home.counters.title': 'Kitchen & bathroom countertops',
    'home.counters.body': 'We help you pick the right stone for how you use the space, then cut and polish it with care.',
    'home.apps.title': 'Our projects',
    'home.apps.body': 'Free design support and planning. The same care on every project.',
    'home.apps.cta': 'See our work',
    'home.featured.title': 'Selected stones',
    'home.featured.body': 'The surfaces people ask about most. Come and see samples of each in our showroom.',
    'home.browse.title': 'Browse by material',
    'home.browse.body': 'Four materials, dozens of colours and veins. Let\'s find the one that suits you.',
    'home.process.title': 'How we work',
    'home.process.body': 'From quote to handover, every step is clear.',
    'home.brands.title': 'Brands we work with',
    'home.count': '{n} options',

    'step1.t': 'Survey and rough sizes', 'step1.b': 'Send us the approximate sizes of your kitchen or bathroom; that is enough for an accurate price.',
    'step2.t': 'Quote and approval', 'step2.b': 'We prepare a clear quote based on the sizes and the stone you chose.',
    'step3.t': 'Final measure and production', 'step3.b': 'Once you approve, our team measures on site and production starts in our workshop.',
    'step4.t': 'Installation', 'step4.b': 'Your countertop is installed in about 7 working days, ready to use.',

    'products.title': 'Products', 'products.body': 'All of our stones. Filter by material, brand or tone.',
    'products.all': 'All', 'products.brand': 'Brand', 'products.tone': 'Tone', 'products.search': 'Search stones',
    'products.empty': 'No stones match this selection. Clear the filters and try again.',
    'products.clear': 'Clear filters', 'products.loading': 'Loading stones…',

    'stone.material': 'Material', 'stone.brand': 'Brand / origin', 'stone.finish': 'Finish',
    'stone.thickness': 'Thickness', 'stone.tone': 'Tone', 'stone.quote': 'Get a quote for this stone',
    'stone.whatsapp': 'Ask on WhatsApp', 'stone.back': 'Back to products', 'stone.related': 'Similar stones',
    'stone.notFound': 'We could not find this stone. It may have been removed from the catalogue.',
    'stone.note': 'Screen colours can differ from the real stone. You can see the sample in our showroom.',
    'stone.waText': 'Hello, I would like information about {name}.',

    'apps.title': 'Projects', 'apps.body': 'A selection of kitchens, bathrooms and custom pieces we have finished.',
    'apps.all': 'All',

    'about.title': 'About us',
    'about.lead': 'Miranoir was founded on a simple idea: craftsmanship that lets the stone speak for itself.',
    'about.p1': 'Our name comes from the black of Nero Marquina and its white veins: lines that catch the light on a dark ground. That balance is what we look for in every project.',
    'about.p2': 'We cut and polish marble, granite, quartz and porcelain countertops in our own workshop. The team that measures is the team that follows production and installs, so responsibility never changes hands.',
    'about.p3': 'We never want you to rush choosing a stone. See the samples in daylight in our showroom and we will choose the right material for your habits together.',
    'about.v1.t': 'We choose the stone with you', 'about.v1.b': 'Advice based on your light and how you cook and live.',
    'about.v2.t': 'Our own workshop', 'about.v2.b': 'Cutting, edging and polishing under one roof.',
    'about.v3.t': 'One team', 'about.v3.b': 'The same people look after you from measuring to installation.',

    'blog.title': 'Journal', 'blog.body': 'Notes on choosing, caring for and installing stone.',
    'blog.read': 'Read the article', 'blog.back': 'All articles', 'blog.notFound': 'We could not find this article.',

    'contact.title': 'Contact', 'contact.body': 'Tell us your sizes and the stone you like, and we will get back to you the same day.',
    'contact.phone': 'Phone', 'contact.email': 'Email', 'contact.address': 'Address', 'contact.social': 'Social media',
    'contact.directions': 'Get directions',

    'form.title': 'Quote request', 'form.name': 'Full name', 'form.phone': 'Phone', 'form.email': 'Email',
    'form.application': 'Where will it go?', 'form.stone': 'Stone you like', 'form.stoneAny': 'Not decided yet',
    'form.size': 'Approximate size', 'form.sizeHint': 'e.g. L-shaped kitchen, 3.2 m + 1.8 m',
    'form.message': 'Notes', 'form.send': 'Request a quote', 'form.sending': 'Sending…',
    'form.sent.t': 'Request received', 'form.sent.b': 'We will call you back on {phone} as soon as possible.',
    'form.again': 'Send another request', 'form.required': 'Name and phone are required.',
    'form.optional': 'optional',

    'footer.tagline': 'Marble, granite, quartz and porcelain countertops.',
    'footer.links': 'Pages', 'footer.contact': 'Contact', 'footer.rights': 'All rights reserved.',
    'wa.label': 'Message us on WhatsApp', 'wa.text': 'Hello, I am reaching out from your website.',
    'lang.switch': 'Türkçe',

    'admin.title': 'Admin', 'admin.login': 'Sign in', 'admin.logout': 'Sign out',
    'admin.email': 'Email', 'admin.password': 'Password', 'admin.demo': 'Demo mode — data is stored in this browser only. Sign in with {email} / {password}',
    'admin.stones': 'Stones', 'admin.quotes': 'Quote requests', 'admin.add': 'Add stone', 'admin.edit': 'Edit',
    'admin.delete': 'Delete', 'admin.confirmDelete': 'Delete "{name}"?', 'admin.save': 'Save', 'admin.cancel': 'Cancel',
    'admin.name': 'Name', 'admin.slug': 'URL (slug)', 'admin.descTr': 'Description (TR)', 'admin.descEn': 'Description (EN)',
    'admin.featured': 'Show on homepage', 'admin.active': 'Live on site', 'admin.photos': 'Photos',
    'admin.upload': 'Upload photo', 'admin.uploading': 'Uploading…', 'admin.noQuotes': 'No quote requests yet.',
    'admin.export': 'Download CSV', 'admin.reset': 'Reset demo data', 'admin.viewSite': 'View site',
    'admin.status.new': 'New', 'admin.status.contacted': 'Contacted', 'admin.status.won': 'Won', 'admin.status.lost': 'Lost',
    'admin.hidden': 'hidden', 'admin.saved': 'Saved',
  },
}

const KEY = 'miranoir-lang'
const initial = (() => {
  try { const v = localStorage.getItem(KEY); if (v === 'tr' || v === 'en') return v } catch {}
  return 'tr'
})()

export const useLang = create((set) => ({
  lang: initial,
  setLang: (lang) => {
    try { localStorage.setItem(KEY, lang) } catch {}
    document.documentElement.lang = lang
    set({ lang })
  },
}))

// t('key', { n: 3 }) → translated string with {placeholders} filled in
export function useT() {
  const lang = useLang((s) => s.lang)
  const t = (key, vars) => {
    let s = dict[lang][key] ?? dict.tr[key] ?? key
    if (vars) for (const k in vars) s = s.replaceAll(`{${k}}`, vars[k])
    return s
  }
  // pick the right language from a { tr, en } object
  t.pick = (obj) => (obj && typeof obj === 'object' ? obj[lang] || obj.tr || '' : obj || '')
  t.lang = lang
  return t
}
