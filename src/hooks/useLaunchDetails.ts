import { useQuery } from '@tanstack/react-query'
import { getLaunchById, getRocketById } from '../api'

const useLaunchDetail = (id: string) => {
  const { data: launch, isLoading: launchLoading, isError } = useQuery({
    queryKey: ['launch', id],
    queryFn: () => getLaunchById(id),
  })

  const { data: rocket, isLoading: rocketLoading } = useQuery({
    queryKey: ['rocket', launch?.rocket],
    queryFn: () => getRocketById(launch!.rocket),
    enabled: !!launch?.rocket,
  })

  return {
    launch,
    rocket,
    isLoading: launchLoading || rocketLoading,
    isError,
  }
}

export default useLaunchDetail