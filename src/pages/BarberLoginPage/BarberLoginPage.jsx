import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { loginBarber } from '../../redux/slices/barberSlice'
import styles from './barberLoginPage.module.css'

function BarberLoginPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error } = useSelector(state => state.barberReducer)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await dispatch(loginBarber({ login, password }))

    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/barber')
    }
  }

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <span className={styles.label}>BETON BARBERSHOP</span>

        <h1>Вход для барбера</h1>

        <p>
          Авторизуйтесь, чтобы посмотреть свои записи клиентов.
        </p>

        <div className={styles.field}>
          <label>Логин</label>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            placeholder="Введите логин"
          />
        </div>

        <div className={styles.field}>
          <label>Пароль</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Введите пароль"
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button disabled={loading} type="submit">
          {loading ? 'Вход...' : 'Войти'}
        </button>

        <NavLink to="/" className={styles.backLink}>
          Вернуться на сайт
        </NavLink>
      </form>
    </div>
  )
}

export default BarberLoginPage
