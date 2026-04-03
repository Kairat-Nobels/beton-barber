import styles from './doctor.module.css'

function Doctor({ obj }) {
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <p className={styles.name}>{obj.name}</p>
                <p className={styles.post}>{obj.post}</p>
            </div>
        </div>
    )
}

export default Doctor
