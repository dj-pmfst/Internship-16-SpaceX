import { useParams, useNavigate } from "react-router-dom";
import styles from './ShipDetail.module.css'

export default function ShipDetail(){
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    return (
        <div className={styles.container}>

        </div>
    )
}