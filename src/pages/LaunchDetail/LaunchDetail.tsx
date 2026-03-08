import { useParams, useNavigate } from 'react-router-dom'
import withErrorBoundary from '../../hoc/withErrorBoundary'
import useLaunchDetail from '../../hooks/useLaunchDetails'
import styles from './LaunchDetail.module.css'
import QueryWrapper from '../../components/QueryWrapper/QueryWrapper'

function LaunchDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { launch, rocket, isLoading, isError } = useLaunchDetail(id!)

  return (
    <QueryWrapper isLoading={isLoading} isError={isError} errorMessage="Failed to load launch details.">
      {launch && (
      <div className={styles.container}>
        <div className={styles.launch}>
          {launch.links.patch.large && (
            <img src={launch.links.patch.large} alt={launch.name} className={styles.patch} />
          )}
          <h1>{launch.name}</h1>
        </div>
        
        <div className={styles.description}>
          <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
          <p>Rocket: {rocket?.name ?? 'Unknown'}</p>
          <p>
            Status:{' '}
            {launch.upcoming ? 'Upcoming' : launch.success ? 'Success' : 'Failed'}
          </p>   
          {launch.details && <p>{launch.details}</p>}       
        </div>
        
        {launch.failures.length > 0 && (
          <div className={styles.failures}>
            <h2>Failure Details</h2>
            {launch.failures.map((failure, i) => (
              <div key={i}>
                <p>Time: T+{failure.time}s</p>
                {failure.altitude && <p>Altitude: {failure.altitude}km</p>}
                <p>Reason: {failure.reason}</p>
              </div>
            ))}
          </div>
        )}
        {launch.links.webcast && (
          <a href={launch.links.webcast} target="_blank" rel="noreferrer">
            Watch on YouTube 
          </a>
        )}
        <button onClick={() => navigate(-1)}>← Back</button>
      </div>
      )}
    </QueryWrapper>
  )
}

export default withErrorBoundary(LaunchDetail)