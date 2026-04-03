import { useEffect } from 'react'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import styles from './servicePage.module.css'
import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'

function ServicePage() {
    const { services, loading, error } = useSelector(state => state.servicesReducer)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.head}>
                <span className={styles.label}>BETON BARBERSHOP</span>
                <h2 className='title'>Наши услуги</h2>
                <p className={styles.text}>
                    Мужские стрижки, оформление бороды и уход —
                    всё, что помогает поддерживать аккуратный и уверенный образ.
                </p>
            </div>

            <div className={styles.service}>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <div className='fetchError'>
                        <p>😕 Error: {error}</p>
                        <p>Проверьте интернет и обновите страницу</p>
                    </div>
                ) : (
                    services.map((s) => <ServiceCard key={s.id} data={s} />)
                )}
            </div>
        </div>
    )
}

export default ServicePage
