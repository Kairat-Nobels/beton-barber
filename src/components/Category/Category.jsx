import styles from './category.module.css'

function Category({ obj }) {
    return (
        <div className={styles.category}>
            <div className={styles.left}>
                <p className={styles.name}>{obj.name}</p>
            </div>

            <div className={styles.right}>
                <p className={styles.price}>{obj.price} сом</p>
            </div>
        </div>
    )
}

export default Category
