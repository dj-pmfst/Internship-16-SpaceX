import { BASE_URL } from './client'
import type { Company } from '../types'

export const getCompanyInfo = async (): Promise<Company> => {
    const res = await fetch(`${BASE_URL}/company`)
    if (!res.ok) throw new Error('Failed to fetch company info')
    return res.json()
  }