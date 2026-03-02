import { BASE_URL } from './client'
import type { Rocket } from '../types'

export const getRocketById = async (id: string): Promise<Rocket> => {
    const res = await fetch(`${BASE_URL}/rockets/${id}`)
    if (!res.ok) throw new Error('Failed to fetch rocket')
    return res.json()
  }
  