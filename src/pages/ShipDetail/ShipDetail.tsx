import { useParams, useNavigate } from "react-router-dom";
import styles from './ShipDetail.module.css'
import useShipDetail from "../../hooks/useShipDetail";
import withErrorBoundary from "../../hoc/withErrorBoundary";
import QueryWrapper from "../../components/QueryWrapper/QueryWrapper";

function ShipDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    
    const { ship, isLoading, isError } = useShipDetail(id!)
  
    return (
      <QueryWrapper isLoading={isLoading} isError={isError} errorMessage="Failed to load ship details.">
        {ship && (
          <div className={styles.container}>
            <div className={styles.topContainer}>
              <div className={styles.leftBlock}>
                <button onClick={() => navigate(-1)}>← Back</button>
                {ship.image
                  ? <img src={ship.image} alt={ship.name} className={styles.image} />
                  : <div className={styles.noImage}>No Image</div>
                }              
              </div>

              <div className={styles.details}>
                <h1>{ship.name}</h1>
                <span>{ship.active ? 'Active' : 'Inactive'}</span>
                <div className={styles.about}>
                  <p>Type: {ship.type}</p>
                  {ship.home_port && <p>Home Port: {ship.home_port}</p>}
                  {ship.year_built && <p>Year Built: {ship.year_built}</p>}                  
                </div>

                {ship.roles.length > 0 && (
                  <div>
                    <h2>Roles</h2>
                    {ship.roles.map(role => (
                      <span key={role}>{role}</span>
                    ))}
                  </div>
                )}
                {ship.launches.length > 0 && (
                  <div className={styles.about}>
                    <h2>Missions</h2>
                    <p>{ship.launches.length} missions</p>
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