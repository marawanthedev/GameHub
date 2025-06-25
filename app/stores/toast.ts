'use client'

import { create } from 'zustand'

type ToastStore = {
    toastId: string | number | null
    startTime: number
    setToast: (id: string | number, start: number) => void
    clearToast: () => void
}

export const useToastStore = create<ToastStore>((set) => ({
    toastId: null,
    startTime: 0,
    setToast: (toastId, startTime) => set({ toastId, startTime }),
    clearToast: () => set({ toastId: null, startTime: 0 }),
}))
