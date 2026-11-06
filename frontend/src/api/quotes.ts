import type { Quote } from '../types'

const API_BASE = (import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '/api' : '')).replace(/\/$/, '')
type JsonRecord = Record<string, unknown>

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseQuote(value: unknown): Quote {
  if (!isRecord(value)) throw new Error('The quote service returned an invalid quote.')
  const id = Number(value.id)
  const season = Number(value.season)
  const chapter = Number(value.chapter)
  const quote = typeof value.quote === 'string' ? value.quote.trim() : ''
  if (!Number.isInteger(id) || id < 1 || !Number.isInteger(season) || !Number.isInteger(chapter) || !quote) {
    throw new Error('The quote service returned an invalid quote.')
  }
  const languageId = value.language_id == null ? undefined : Number(value.language_id)
  return { id, quote, season, chapter, ...(Number.isInteger(languageId) ? { language_id: languageId } : {}) }
}

function unwrapList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload
  if (isRecord(payload)) {
    for (const key of ['quotes', 'data', 'results', 'items']) {
      if (Array.isArray(payload[key])) return payload[key] as unknown[]
    }
    if (isRecord(payload.data)) return unwrapList(payload.data)
  }
  throw new Error('The quote service returned an unexpected list format.')
}

async function request(path: string, signal?: AbortSignal): Promise<unknown> {
  if (!API_BASE) {
    throw new Error('Set VITE_API_BASE_URL to the deployed Flask API URL before using the quote archive.')
  }
  let response: Response
  try {
    response = await fetch(`${API_BASE}${path}`, { signal, headers: { Accept: 'application/json' } })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new Error('Could not reach the quote API. Check its URL, availability, and CORS configuration.')
  }
  if (!response.ok) throw new Error(response.status === 404 ? 'That quote could not be found.' : `The quote service returned ${response.status}.`)
  try {
    return await response.json() as unknown
  } catch {
    throw new Error('The quote service returned invalid JSON.')
  }
}

export async function getQuotes(signal?: AbortSignal): Promise<Quote[]> {
  const payload = await request('/quotes/english', signal)
  return unwrapList(payload).map(parseQuote)
}

export async function getQuote(id: number, signal?: AbortSignal): Promise<Quote> {
  const payload = await request(`/quotes/${id}`, signal)
  const candidate = isRecord(payload) && isRecord(payload.quote) ? payload.quote : isRecord(payload) && isRecord(payload.data) ? payload.data : payload
  return parseQuote(candidate)
}
