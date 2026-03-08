import { useQuery } from '@tanstack/react-query'
import { getShipById } from '../api'

const useShipDetail = (id: string) => {
    const {data: ship, isLoading: shipLoading, isError} = useQuery({
        queryKey: ['ship', id],
        queryFn: () => getShipById(id),
    })

    return {
        ship,
        isLoading: shipLoading,
        isError,
      }
}

export default useShipDetail