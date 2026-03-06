import { useInfiniteQuery } from '@tanstack/react-query'
import { getShips } from '../api'
import { QueryResponse, Ship } from '../types'

const useInfiniteShips = (search: string) => {
  return useInfiniteQuery({
    queryKey: ['ships', search],
    queryFn: ({ pageParam }) => getShips(pageParam, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage: QueryResponse<Ship>) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined
    },
  })
}

export default useInfiniteShips