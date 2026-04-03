import { NavLink } from 'react-router-dom'
import styles from './serviceCard.module.css'

function ServiceCard({ data }) {
    return (
        <NavLink
            state={data}
            to={`/services/${data.id}`}
            className={styles.card}
        >
            <div className={styles.img}>
                <img src={data.img} alt={data.name} />
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.info}>
                <h3>{data.name}</h3>
            </div>
        </NavLink>
    )
}

export default ServiceCard
