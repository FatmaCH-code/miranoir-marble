import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useT } from '../i18n'
import { useStones } from '../store/stones'
import { deleteStone, resetDemoData, backendMode } from '../services/api'
import StoneEditor from './StoneEditor'

export default function StonesPanel() {
  const t = useT()
  const { stones, ready, load } = useStones()
  const [editing, setEditing] = useState(null) // null | 'new' | stone
  const [error, setError] = useState('')
  useEffect(() => { load(true) }, [load])

  const remove = async (s) => {
    if (!confirm(t('admin.confirmDelete', { name: s.name }))) return
    try { await deleteStone(s.id); load(true) } catch (e) { setError(e.message) }
  }

  if (editing) return <StoneEditor stone={editing === 'new' ? null : editing} onDone={() => { setEditing(null); load(true) }} />

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl">{t('admin.stones')} <span className="text-vein">({stones.length})</span></h1>
        <div className="flex gap-2">
          {backendMode === 'local' && (
            <button className="btn-line !py-2.5 text-sm" onClick={() => { if (confirm(t('admin.reset') + '?')) { resetDemoData(); load(true) } }}>{t('admin.reset')}</button>
          )}
          <button className="btn !py-2.5" onClick={() => setEditing('new')}><Plus className="h-4 w-4" />{t('admin.add')}</button>
        </div>
      </div>
      {error && <p className="mt-4 text-[#A1362B]">{error}</p>}
      {!ready ? <p className="mt-8 text-vein">…</p> : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-mist bg-white">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <tbody className="divide-y divide-mist">
              {stones.map((s) => (
                <tr key={s.id}>
                  <td className="w-20 p-3"><img src={s.images[0]} alt="" className="h-14 w-14 rounded object-cover" /></td>
                  <td className="p-3">
                    <div className="font-medium">{s.name} {!s.active && <span className="ml-1 rounded bg-mist px-2 py-0.5 text-xs text-vein">{t('admin.hidden')}</span>}</div>
                    <div className="text-sm text-vein">/{s.slug}</div>
                  </td>
                  <td className="p-3">{s.collection ? t(`col.${s.collection}`) : t(`mat.${s.material}`)}</td>
                  <td className="p-3 text-vein">{s.brand}</td>
                  <td className="p-3">{s.featured ? '✦' : ''}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => setEditing(s)} className="rounded-full p-2 hover:bg-mist" aria-label={t('admin.edit')}><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => remove(s)} className="rounded-full p-2 text-[#A1362B] hover:bg-mist" aria-label={t('admin.delete')}><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
