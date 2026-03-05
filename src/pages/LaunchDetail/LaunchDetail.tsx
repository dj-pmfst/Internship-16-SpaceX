import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getLaunchById, getRocketById } from '../../api'
import styles from './LaunchDetail.module.css'

export default function LaunchDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: launch, isLoading: launchLoading, isError } = useQuery({
    queryKey: ['launch', id],
    queryFn: () => getLaunchById(id!),
  })

  const { data: rocket, isLoading: rocketLoading } = useQuery({
    queryKey: ['rocket', launch?.rocket],
    queryFn: () => getRocketById(launch!.rocket),
    enabled: !!launch?.rocket, 
  })

  if (launchLoading || rocketLoading) 
    return <div className={styles.spinner} />
  if (isError) 
    return <p>Failed to load launch details.</p>
  if (!launch) 
    return null

    return (
        <div className={styles.container}>
        </div>
    )
}