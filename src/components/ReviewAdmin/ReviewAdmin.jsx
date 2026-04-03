import { useState } from "react"
import DeleteModal from "../DeleteModal/DeleteModal"
import styles from './reviewAdmin.module.css'
function ReviewAdmin({ data }) {
    const [modal, setModal] = useState(false)
    return (
        <div className={styles.review}>
            <p className={styles.p}> {data.name}</p>
            <p className={styles.p}><a href={`tel:+996${data.phone}`}>+996{data.phone}</a></p>
            <p className={`${styles.p} ${styles.comment}`}>{data.comment}</p>
            <div><button className={styles.button} onClick={e => setModal(true)}>Удалить</button></div>
            {
                modal && <DeleteModal setModal={setModal} data={data} />
            }
        </div>
    )
}

export default ReviewAdmin