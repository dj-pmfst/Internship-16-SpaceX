import { useQuery } from '@tanstack/react-query'
import { getLaunches } from '../api'
import type { Filter } from '../types'

const useLaunches = (page: number, search: string, filter: Filter) => {
  return useQuery({
    queryKey: ['launches', page, search, filter],
    queryFn: () => getLaunches(page, search, filter),
  })
}

export default useLaunches