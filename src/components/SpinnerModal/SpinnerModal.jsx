import { Watch } from 'react-loader-spinner'
import styles from './spinner.module.css'

function SpinnerModal() {
    return (
        <section className={styles.loading}>
            <Watch
                height="60"
                width="60"
                radius="48"
                color="#d4af37"
                ariaLabel="watch-loading"
                visible={true}
            />
        </section>
    )
}

export default SpinnerModal