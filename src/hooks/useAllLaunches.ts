import { useQuery } from '@tanstack/react-query'
import { getAllLaunches } from '../api'
import { useMemo } from 'react'
import type { Filter } from '../types'

const useAllLaunches = (filter: Filter = 'all') => {
  const query = useQuery({
    queryKey: ['allLaunches'],
    queryFn: getAllLaunches,
    staleTime: 1000 * 60 * 10,
  })

  const filteredData = useMemo(() => {
    if (!query.data) 
      return []
    return query.data.filter(launch => {
      if (filter === 'success') 
        return launch.success === true
      if (filter === 'failed') 
        return launch.success === false
      if (filter === 'upcoming') 
        return launch.upcoming === true
      return true
    })
  }, [query.data, filter])

  return { ...query, filteredData }
}

export default useAllLaunches