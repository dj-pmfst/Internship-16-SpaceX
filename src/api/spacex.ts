import type { Launch, Ship, Rocket, Company, QueryResponse } from '../types'

const BASE_URL = 'https://api.spacexdata.com/v4'

export const getCompanyInfo = async (): Promise<Company> => {
  const res = await fetch(`${BASE_URL}/company`)
  if (!res.ok) throw new Error('Failed to fetch company info')
  return res.json()
}

export const getNextLaunch = async (): Promise<Launch> => {
  const res = await fetch(`${BASE_URL}/launches/next`)
  if (!res.ok) throw new Error('Failed to fetch next launch')
  return res.json()
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

export const getRocketById = async (id: string): Promise<Rocket> => {
  const res = await fetch(`${BASE_URL}/rockets/${id}`)
  if (!res.ok) throw new Error('Failed to fetch rocket')
  return res.json()
}

export const getShips = async (
  page: number,
  search: string
): Promise<QueryResponse<Ship>> => {
  const query: Record<string, unknown> = {}

  if (search) query.name = { $regex: search, $options: 'i' }

  const res = await fetch(`${BASE_URL}/ships/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      options: { page, limit: 10 },
    }),
  })
  if (!res.ok) throw new Error('Failed to fetch ships')
  return res.json()
}

export const getShipById = async (id: string): Promise<Ship> => {
  const res = await fetch(`${BASE_URL}/ships/${id}`)
  if (!res.ok) throw new Error('Failed to fetch ship')
  return res.json()
}