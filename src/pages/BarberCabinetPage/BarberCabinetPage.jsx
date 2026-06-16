import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { outBarber } from '../../redux/slices/barberSlice'
import { getRecords } from '../../redux/slices/recordSlice'
import styles from './barberCabinetPage.module.css'

function BarberCabinetPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { records } = useSelector(state => state.recordsReducer)
  const { currentBarber } = useSelector(state => state.barberReducer)

  useEffect(() => {
    dispatch(getRecords())
  }, [dispatch])

  const myRecords = useMemo(() => {
    if (!currentBarber) return []
    return records.filter(record => record.master === currentBarber.name)
  }, [records, currentBarber])

  const handleLogout = () => {
    dispatch(outBarber())
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.brand}>
          <span>BETON BARBERSHOP</span>
          <h1>{currentBarber?.name}</h1>
          <p>{currentBarber?.post || 'Барбер'}</p>
        </div>

        <div className={styles.actions}>
          <button className={styles.secondaryBtn} onClick={() => navigate('/')}>
            На главную
          </button>

          <button className={styles.primaryBtn} onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span>Записей</span>
          <strong>{myRecords.length}</strong>
        </div>

        <div className={styles.statCard}>
          <span>Кабинет</span>
          <strong>Барбер</strong>
        </div>
      </div>

      <div className={styles.info}>
        <h2>Мои записи</h2>
        <p>Здесь отображаются только клиенты, записанные именно к вам.</p>
      </div>

      {myRecords.length === 0 ? (
        <div className={styles.empty}>
          <h3>Пока нет записей</h3>
          <p>Когда клиент выберет вас при записи, заявка появится здесь.</p>
        </div>
      ) : (
        <div className={styles.records}>
          {myRecords.map(record => (
            <div key={record.id} className={styles.card}>
              <div className={styles.cardTop}>
                <h3>{record.name}</h3>
                <span>{record.time}</span>
              </div>

              <div className={styles.cardInfo}>
                <p><strong>Телефон:</strong> {record.phone}</p>
                <p><strong>Услуга:</strong> {record.service}</p>
                <p><strong>Дата:</strong> {record.date}</p>
                <p><strong>Барбер:</strong> {record.master}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BarberCabinetPage
