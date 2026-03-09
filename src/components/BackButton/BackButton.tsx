import { useNavigate } from 'react-router-dom'
import styles from './BackButton.module.css'

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <button className={styles.back} onClick={() => navigate(-1)}>
      ← Back
    </button>
  )
}