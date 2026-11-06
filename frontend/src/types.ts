export interface Quote {
  id: number
  quote: string
  season: number
  chapter: number
  language_id?: number
}

export type ToastKind = 'success' | 'error' | 'info'
export interface ToastMessage { id: number; kind: ToastKind; message: string }
