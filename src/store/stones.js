import { create } from 'zustand'
import { listStones } from '../services/api'

export const useStones = create((set, get) => ({
  stones: [],
  ready: false,
  error: '',
  load: async (force = false) => {
    if (get().ready && !force) return
    try { set({ stones: await listStones(), ready: true, error: '' }) }
    catch (e) { set({ ready: true, error: e.message }) }
  },
}))

// public pages only see stones that are switched on
export const usePublicStones = () => {
  const { stones, ready, error } = useStones()
  return { stones: stones.filter((s) => s.active), ready, error }
}
