import { useEffect, useRef, useState } from "react";
import styles from './cameModal.module.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../redux/slices/adminSlice";

function CameModal({ setModal }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const closeModal = (e) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
            setModal(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(loginAdmin({ login, password }));

        if (res.meta.requestStatus === 'fulfilled') {
            setModal(false);
            navigate('/admin');
        }
    };

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
                <p className={styles.subtitle}>Вход в административную панель</p>

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

                <button className={styles.submitBtn} type="submit">
                    Войти
                </button>
            </form>
        </div>
    );
}

export default CameModal;
