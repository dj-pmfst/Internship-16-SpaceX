import { Ship } from '../../types'
import styles from './ShipCard.module.css'

interface Props {
  ship: Ship
  onClick: () => void
}

export default function ShipCard({ ship, onClick }: Props) {
  return (
    <div className={styles.card} onClick={onClick}>
      {ship.image
        ? <img src={ship.image} alt={ship.name} className={styles.image} />
        : <div className={styles.noImage}>No Image</div>
      }
      <div className={styles.info}>
        <h3>{ship.name}</h3>
        <p>{ship.type}</p>
        <span>{ship.active ? 'Active' : 'Inactive'}</span>
      </div>
    </div>
  )
}