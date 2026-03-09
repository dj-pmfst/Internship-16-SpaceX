import { useNavigate } from 'react-router-dom'
import { Launch } from '../../types'
import styles from './LaunchCard.module.css'

interface Props {
  launch: Launch
}

export default function LaunchCard({ launch }: Props) {
  const navigate = useNavigate()

  const statusClass = launch.upcoming
    ? styles.upcoming
    : launch.success
    ? styles.success
    : styles.failed

  const statusLabel = launch.upcoming ? 'Upcoming' : launch.success ? 'Success' : 'Failed'

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/launches/${launch.id}`)}
    >
      {launch.links.patch.small
        ? <img src={launch.links.patch.small} alt={launch.name} className={styles.patch} />
        : <div className={styles.patchPlaceholder} />
      }
      <div className={styles.cardInfo}>
        <span className={styles.cardName}>{launch.name}</span>
        <span className={styles.cardDate}>
          {new Date(launch.date_utc).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
      <span className={`${styles.cardStatus} ${statusClass}`}>
        {statusLabel}
      </span>
    </div>
  )
}