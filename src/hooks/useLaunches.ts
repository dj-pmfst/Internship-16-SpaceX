import { useQuery } from '@tanstack/react-query'
import { getLaunches } from '../api'

type Filter = 'all' | 'success' | 'failed' | 'upcoming'

const useLaunches = (page: number, search: string, filter: Filter) => {
  return useQuery({
    queryKey: ['launches', page, search, filter],
    queryFn: () => getLaunches(page, search, filter),
  })
}

export default useLaunches