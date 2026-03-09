import { useParams } from 'react-router-dom'
import withErrorBoundary from '../../hoc/withErrorBoundary'
import useLaunchDetail from '../../hooks/useLaunchDetails'
import styles from './LaunchDetail.module.css'
import QueryWrapper from '../../components/QueryWrapper/QueryWrapper'
import BackButton from '../../components/BackButton/BackButton'

function LaunchDetail() {
  const { id } = useParams<{ id: string }>()

  const { launch, rocket, isLoading, isError } = useLaunchDetail(id!)

  const statusClass = launch?.upcoming
    ? styles.upcoming
    : launch?.success
    ? styles.success
    : styles.failed

  const statusLabel = launch?.upcoming ? 'Upcoming' : launch?.success ? 'Success' : 'Failed'

  return (
    <QueryWrapper isLoading={isLoading} isError={isError} errorMessage="Failed to load launch details.">
      {launch && (
        <div className={styles.container}>
          <BackButton />

          <div className={styles.header}>
            {launch.links.patch.large && (
              <img src={launch.links.patch.large} alt={launch.name} className={styles.patch} />
            )}
            <div className={styles.headerInfo}>
              <h1 className={styles.title}>{launch.name}</h1>
              <span className={`${styles.status} ${statusClass}`}>{statusLabel}</span>
            </div>
          </div>

          <hr className={styles.divider} />

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Date</span>
              <span className={styles.metaValue}>
                {new Date(launch.date_utc).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Rocket</span>
              <span className={styles.metaValue}>{rocket?.name ?? 'Unknown'}</span>
            </div>
          </div>

          {launch.details && (
            <p className={styles.details}>{launch.details}</p>
          )}

          {launch.failures.length > 0 && (
            <div className={styles.failures}>
              <h2 className={styles.failuresTitle}>Failure Details</h2>
              {launch.failures.map((failure, i) => (
                <div key={i} className={styles.failureItem}>
                  <p>Time: T+{failure.time}s</p>
                  {failure.altitude && <p>Altitude: {failure.altitude}km</p>}
                  <p>Reason: {failure.reason}</p>
                </div>
              ))}
            </div>
          )}

          {launch.links.webcast && (
            <div className={styles.links}>
              <a href={launch.links.webcast} target="_blank" rel="noreferrer">
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      )}
    </QueryWrapper>
  )
}

export default withErrorBoundary(LaunchDetail)