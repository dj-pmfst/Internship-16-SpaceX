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

        </div>
    )
}