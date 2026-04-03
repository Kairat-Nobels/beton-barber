import styles from './homeDoctors.module.css'

function HomeDoctors({ data }) {
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={data.img} alt={data.name} />
            </div>

            <div className={styles.info}>
                <h3 className={styles.name}>{data.name}</h3>
                <p className={styles.post}>{data.post}</p>
            </div>
        </div>
    )
}

export default HomeDoctors
