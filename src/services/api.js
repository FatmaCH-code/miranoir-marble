// One API for the whole site, with two interchangeable backends:
//   • "supabase" — real Postgres database (when VITE_SUPABASE_* are set)
//   • "local"    — demo mode, stored in this browser only
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { seedStones } from '../data/seedStones'
import { compressImage } from '../lib/utils'

export const backendMode = isSupabaseConfigured ? 'supabase' : 'local'
export const DEMO_ADMIN = { email: 'admin@miranoir.com', password: 'miranoir123' }

const fail = (error, fallback) => { throw new Error(error?.message || fallback) }

// ---------- row <-> object ----------
const stoneFromRow = (r) => ({
  id: r.id, slug: r.slug, name: r.name, collection: r.collection || '', material: r.material, brand: r.brand || '',
  tone: r.tone || 'light', finish: r.finish || '', thickness: r.thickness || '',
  description: { tr: r.description_tr || '', en: r.description_en || '' },
  images: r.images || [], featured: !!r.featured, active: !!r.active,
})
const stoneToRow = (s) => ({
  slug: s.slug.trim(), name: s.name.trim(), collection: s.collection, material: s.material, brand: (s.brand || '').trim(),
  tone: s.tone || 'light', finish: (s.finish || '').trim(), thickness: (s.thickness || '').trim(),
  description_tr: s.description.tr, description_en: s.description.en,
  images: s.images, featured: !!s.featured, active: s.active !== false,
})
const quoteFromRow = (r) => ({
  id: r.id, name: r.name, phone: r.phone, email: r.email || '', application: r.application || '',
  stone: r.stone || '', size: r.size || '', message: r.message || '', status: r.status, createdAt: r.created_at,
})

// ---------- local demo storage ----------
const LS = { stones: 'miranoir-stones-v2', quotes: 'miranoir-quotes', admin: 'miranoir-admin' }
const readLS = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const writeLS = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)) }
  catch { throw new Error('Browser storage is full. Remove a large photo or reset the demo data.') }
}
const localStones = () => {
  let list = readLS(LS.stones, null)
  if (!list) { list = seedStones; try { writeLS(LS.stones, list) } catch {} }
  return list
}

// ================= STONES =================
export async function listStones() {
  if (backendMode === 'supabase') {
    const { data, error } = await supabase.from('stones').select('*').order('id')
    if (error) fail(error, 'Could not load stones')
    return data.map(stoneFromRow)
  }
  return localStones()
}

export async function saveStone(stone) {
  if (backendMode === 'supabase') {
    const q = stone.id
      ? supabase.from('stones').update(stoneToRow(stone)).eq('id', stone.id)
      : supabase.from('stones').insert(stoneToRow(stone))
    const { data, error } = await q.select().single()
    if (error) fail(error, 'Could not save the stone')
    return stoneFromRow(data)
  }
  const list = localStones()
  if (list.some((x) => x.slug === stone.slug && x.id !== stone.id)) throw new Error('Another stone already uses this URL (slug).')
  if (stone.id) {
    writeLS(LS.stones, list.map((x) => (x.id === stone.id ? stone : x)))
    return stone
  }
  const row = { ...stone, id: Math.max(0, ...list.map((x) => x.id)) + 1 }
  writeLS(LS.stones, [...list, row])
  return row
}

export async function deleteStone(id) {
  if (backendMode === 'supabase') {
    const { error } = await supabase.from('stones').delete().eq('id', id)
    if (error) fail(error, 'Could not delete')
    return
  }
  writeLS(LS.stones, localStones().filter((x) => x.id !== id))
}

export async function uploadStoneImage(file) {
  const blob = await compressImage(file)
  if (backendMode === 'supabase') {
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`
    const { error } = await supabase.storage.from('stone-images').upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' })
    if (error) fail(error, 'Upload failed — did you create the "stone-images" bucket?')
    return supabase.storage.from('stone-images').getPublicUrl(path).data.publicUrl
  }
  const small = await compressImage(file, 900, 0.78) // keep demo storage small
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result)
    r.onerror = () => reject(new Error('Could not read file'))
    r.readAsDataURL(small)
  })
}

// ================= QUOTES =================
export async function createQuote(q) {
  const clean = {
    name: q.name.trim(), phone: q.phone.trim(), email: (q.email || '').trim(), application: q.application || '',
    stone: q.stone || '', size: (q.size || '').trim(), message: (q.message || '').trim(),
  }
  if (backendMode === 'supabase') {
    const { error } = await supabase.from('quotes').insert(clean)
    if (error) fail(error, 'Could not send your request')
    return
  }
  const list = readLS(LS.quotes, [])
  writeLS(LS.quotes, [{ ...clean, id: Date.now(), status: 'new', createdAt: new Date().toISOString() }, ...list])
}

export async function listQuotes() {
  if (backendMode === 'supabase') {
    const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false }).limit(1000)
    if (error) fail(error, 'Could not load quote requests')
    return data.map(quoteFromRow)
  }
  return readLS(LS.quotes, [])
}

export async function updateQuoteStatus(id, status) {
  if (backendMode === 'supabase') {
    const { error } = await supabase.from('quotes').update({ status }).eq('id', id)
    if (error) fail(error, 'Could not update')
    return
  }
  writeLS(LS.quotes, readLS(LS.quotes, []).map((q) => (q.id === id ? { ...q, status } : q)))
}

// ================= ADMIN AUTH =================
export async function getAdmin() {
  if (backendMode === 'supabase') {
    const { data } = await supabase.auth.getSession()
    const email = data.session?.user?.email
    if (!email) return null
    const { data: ok } = await supabase.rpc('is_admin')
    return ok ? { email } : null
  }
  return readLS(LS.admin, null)
}

export async function adminSignIn(email, password) {
  if (backendMode === 'supabase') {
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) throw new Error('Wrong email or password')
    const { data: ok } = await supabase.rpc('is_admin')
    if (!ok) { await supabase.auth.signOut(); throw new Error('This account does not have admin access') }
    return { email: data.user.email }
  }
  if (email.trim().toLowerCase() !== DEMO_ADMIN.email || password !== DEMO_ADMIN.password) throw new Error('Wrong email or password')
  const admin = { email: DEMO_ADMIN.email }
  writeLS(LS.admin, admin)
  return admin
}

export async function adminSignOut() {
  if (backendMode === 'supabase') await supabase.auth.signOut()
  else try { localStorage.removeItem(LS.admin) } catch {}
}

export function resetDemoData() {
  try { localStorage.removeItem(LS.stones); localStorage.removeItem(LS.quotes) } catch {}
}
