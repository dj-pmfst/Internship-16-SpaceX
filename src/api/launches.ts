import { BASE_URL } from './client'
import type { Launch, QueryResponse } from '../types'

export const getNextLaunch = async (): Promise<Launch> => {
  const res = await fetch(`${BASE_URL}/launches/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: { upcoming: true },
      options: {
        limit: 1,
        sort: { date_utc: 'asc' }, 
      },
    }),
  })
  if (!res.ok) throw new Error('Failed to fetch next launch')
  const data = await res.json()
  return data.docs[0] 
}
  
export const getLaunches = async (
  page: number,
  search: string,
  filter: 'all' | 'success' | 'failed' | 'upcoming'
): Promise<QueryResponse<Launch>> => {
  const query: Record<string, unknown> = {}

  if (search) query.name = { $regex: search, $options: 'i' }
  if (filter === 'success') query.success = true
  if (filter === 'failed') query.success = false
  if (filter === 'upcoming') query.upcoming = true

  const res = await fetch(`${BASE_URL}/launches/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      options: { page, limit: 10, sort: { date_utc: 'desc' } },
    }),
  })
  if (!res.ok) throw new Error('Failed to fetch launches')
  return res.json()
}

export const getLaunchById = async (id: string): Promise<Launch> => {
  const res = await fetch(`${BASE_URL}/launches/${id}`)
  if (!res.ok) throw new Error('Failed to fetch launch')
  return res.json()
}

export const getAllLaunches = async (): Promise<Launch[]> => {
  const res = await fetch(`${BASE_URL}/launches/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: {},
      options: {
        limit: 200, 
        select: ['date_utc', 'success', 'upcoming'] 
      },
    }),
  })
  if (!res.ok) throw new Error('Failed to fetch all launches')
  const data = await res.json()
  return data.docs
}