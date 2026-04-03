import { useState } from "react"
import DeleteModal from "../DeleteModal/DeleteModal"
import styles from './record.module.css'

function Record({ data }) {
    const [modal, setModal] = useState(false)

    return (
        <div className={styles.record}>
            <p>{data.name}</p>
            <p>{data.phone}</p>
            <p>{data.master}</p>
            <p>{data.service}</p>
            <p>{data.date}</p>
            <p>{data.time}</p>
            <div className={styles.div}><button className={styles.button} onClick={e => setModal(true)}>Удалить</button></div>
            {
                modal && <DeleteModal setModal={setModal} data={data} />
            }
        </div>
    )
}

export default Record