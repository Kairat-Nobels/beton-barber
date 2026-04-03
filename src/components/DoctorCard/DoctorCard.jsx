import styles from './doctorCard.module.css'

function DoctorCard({ data }) {
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={data.img} alt={data.name} />
            </div>

            <div className={styles.info}>
                <h3 className={styles.name}>{data.name}</h3>
                <p className={styles.post}>{data.post}</p>

                <div className={styles.details}>
                    <p><span>Стаж:</span> {data.experience}</p>
                    <p><span>Возраст:</span> {data.age} лет</p>
                    <p><span>Образование:</span> {data.education}</p>
                </div>
            </div>
        </div>
    )
}

export default DoctorCard