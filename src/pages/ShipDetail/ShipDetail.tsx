import { useParams } from 'react-router-dom'
import styles from './ShipDetail.module.css'
import useShipDetail from '../../hooks/useShipDetail'
import withErrorBoundary from '../../hoc/withErrorBoundary'
import QueryWrapper from '../../components/QueryWrapper/QueryWrapper'
import BackButton from '../../components/BackButton/BackButton'

function ShipDetail() {
  const { id } = useParams<{ id: string }>()

  const { ship, isLoading, isError } = useShipDetail(id!)

  return (
    <QueryWrapper isLoading={isLoading} isError={isError} errorMessage="Failed to load ship details.">
      {ship && (
        <div className={styles.container}>
          <BackButton />

          <div className={styles.topContainer}>
            <div className={styles.leftBlock}>
              {ship.image
                ? <img src={ship.image} alt={ship.name} className={styles.image} />
                : <div className={styles.noImage}>No Image</div>
              }
            </div>

            <div className={styles.details}>
              <div className={styles.headerInfo}>
                <h1 className={styles.title}>{ship.name}</h1>
                <span className={ship.active ? styles.activeStatus : styles.inactiveStatus}>
                  {ship.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Type</span>
                  <span className={styles.metaValue}>{ship.type}</span>
                </div>
                {ship.home_port && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Home Port</span>
                    <span className={styles.metaValue}>{ship.home_port}</span>
                  </div>
                )}
                {ship.year_built && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Year Built</span>
                    <span className={styles.metaValue}>{ship.year_built}</span>
                  </div>
                )}
                {ship.launches.length > 0 && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Missions</span>
                    <span className={styles.metaValue}>{ship.launches.length}</span>
                  </div>
                )}
              </div>

              {ship.roles.length > 0 && (
                <div className={styles.roles}>
                  {ship.roles.map(role => (
                    <span key={role} className={styles.role}>{role}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {ship.link && (
            <a href={ship.link} target="_blank" rel="noreferrer">
              View on Marine Traffic
            </a>
          )}
        </div>
      )}
    </QueryWrapper>
  )
}

export default withErrorBoundary(ShipDetail)