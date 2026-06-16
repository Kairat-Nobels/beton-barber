import { useEffect, useRef, useState } from "react"
import styles from './cameModal.module.css'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginAdmin } from "../../redux/slices/adminSlice"
import { loginBarber } from "../../redux/slices/barberSlice"

function CameModal({ setModal }) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formRef = useRef(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    const closeModal = (e) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
            setModal(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const adminRes = await dispatch(loginAdmin({ login, password }))

        if (adminRes.meta.requestStatus === 'fulfilled') {
            setLoading(false)
            setModal(false)
            navigate('/admin')
            return
        }

        const barberRes = await dispatch(loginBarber({ login, password }))

        if (barberRes.meta.requestStatus === 'fulfilled') {
            setLoading(false)
            setModal(false)
            navigate('/barber')
            return
        }

        setLoading(false)
    }

    return (
        <div onClick={closeModal} className={styles.window}>
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
                <button
                    type="button"
                    onClick={() => setModal(false)}
                    className={styles.closeX}
                    aria-label="Закрыть"
                >
                    ×
                </button>

                <h2>Авторизация</h2>
                <p className={styles.subtitle}>
                    Вход для администратора или барбера
                </p>

                <div className={styles.field}>
                    <label>Логин</label>
                    <input
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        required
                        placeholder="Введите логин"
                    />
                </div>

                <div className={styles.field}>
                    <label>Пароль</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        required
                        placeholder="Введите пароль"
                    />
                </div>

                <button
                    disabled={loading}
                    className={styles.submitBtn}
                    type="submit"
                >
                    {loading ? 'Проверка...' : 'Войти'}
                </button>
            </form>
        </div>
    )
}

export default CameModal
