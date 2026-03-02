import type { Ship, QueryResponse } from '../types'
import { BASE_URL } from './client'

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