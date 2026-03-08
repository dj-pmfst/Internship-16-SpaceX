import { useParams, useNavigate } from "react-router-dom";
import styles from './ShipDetail.module.css'
import useShipDetail from "../../hooks/useShipDetail";

export default function ShipDetail(){
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { ship, isLoading, isError } = useShipDetail(id!)

    if (isLoading) 
    return <div className={styles.spinner} />
    if (isError) 
        return <p>Failed to load ship details.</p>
    if (!ship) 
        return null

    return (
        <div className={styles.container}>
          <button onClick={() => navigate(-1)}>← Back</button>

          {ship.image
            ? <img src={ship.image} alt={ship.name} className={styles.image} />
            : <div className={styles.noImage}>No Image</div>
          }         
          <h1>{ship.name}</h1>
          <span>{ship.active ? 'Active' : 'Inactive'}</span>

          <p>Type: {ship.type}</p>
          {ship.home_port && <p>Home Port: {ship.home_port}</p>}
          {ship.year_built && <p>Year Built: {ship.year_built}</p>}

          {ship.roles.length > 0 && (
            <div>
                <h2>Roles</h2>
                {ship.roles.map(role => (
                <span key={role}>{role}</span>
                ))}
            </div>
          )}
          {ship.launches.length > 0 && (
            <div>
                <h2>Missions</h2>
                <p>{ship.launches.length} missions</p>
            </div>
           )}
        
          {ship.link && (
            <a href={ship.link} target="_blank" rel="noreferrer">
                View on marine trraffic
            </a>
          )}
        </div>
    )
}