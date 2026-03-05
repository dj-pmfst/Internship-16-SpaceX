import { useParams, useNavigate } from 'react-router-dom'
import useLaunchDetail from '../../hooks/useLaunchDetails'
import styles from './LaunchDetail.module.css'

export default function LaunchDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { launch, rocket, isLoading, isError } = useLaunchDetail(id!)

  if (isLoading) 
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