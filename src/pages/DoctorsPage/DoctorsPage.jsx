import { useSelector } from 'react-redux'
import styles from './doctorsPage.module.css'
import DoctorCard from '../../components/DoctorCard/DoctorCard'
import { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Spinner from '../../components/Spinner/Spinner'

function DoctorsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { doctors, loading, error } = useSelector((state) => state.doctorsReducer)

  return (
    <>
      <div className={styles.page}>
        <div className={styles.head}>
          <span className={styles.label}>BETON BARBERSHOP</span>
          <h2 className="title">Наши барберы</h2>
          <p className={styles.text}>
            Команда мастеров, которые работают с точностью, стилем и вниманием
            к деталям. Каждый барбер помогает подобрать образ, который подойдёт
            именно тебе.
          </p>
        </div>

        <div className={styles.doctors}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="fetchError">
              <p>😕 Error: {error}</p>
              <p>Проверьте интернет и обновите страницу</p>
            </div>
          ) : (
            doctors.map((s) => <DoctorCard key={s.id} data={s} />)
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default DoctorsPage
