import { useDispatch } from 'react-redux'
import styles from './layout.module.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getRecords } from '../../redux/slices/recordSlice'
import CameModal from '../../components/CameModal/CameModal'
import { getService } from '../../redux/slices/servicesSlice'
import { getReviews } from '../../redux/slices/reviewsSlice'
import { getDoctors } from '../../redux/slices/doctorsSlice'
import logo from '../../assets/logo.png'

function Layout() {
    const [modal, setModal] = useState(false)
    const [burger, setBurger] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getRecords())
        dispatch(getService())
        dispatch(getDoctors())
        dispatch(getReviews())
    }, [dispatch])

    useEffect(() => {
        document.body.style.overflow = burger ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [burger])

    return (
        <>
            <div className={styles.top}>
                <div className="container">
                    <div className={styles.topInner}>
                        <div className={styles.topContacts}>
                            <a href="tel:+996707360005">
                                <div className={styles.contItem}>
                                    <span>+996 707 360 005</span>
                                </div>
                            </a>

                            <a href="mailto:beton.barbershop@gmail.com">
                                <div className={styles.contItem}>
                                    <span>beton.barbershop@gmail.com</span>
                                </div>
                            </a>

                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://wa.me/996707360005"
                            >
                                <div className={styles.contItem}>
                                    <span>WhatsApp / Запись онлайн</span>
                                </div>
                            </a>
                        </div>

                        <p className={styles.workTime}>
                            Режим работы: <span>Ежедневно с 10:00 до 22:00</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.headerWrap}>
                <div className="container">
                    <nav className={styles.navbar}>
                        <div className={styles.left}>
                            <NavLink className={styles.logo} to="/">
                                <img src={logo} alt="BETON Barbershop" />
                                <div className={styles.logoText}>
                                    <h1>BETON</h1>
                                    <p>barbershop</p>
                                </div>
                            </NavLink>
                        </div>

                        <div className={styles.info}>
                            <ul>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive ? styles.active : ''
                                        }
                                    >
                                        Главная
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/services"
                                        className={({ isActive }) =>
                                            isActive ? styles.active : ''
                                        }
                                    >
                                        Услуги
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/doctors"
                                        className={({ isActive }) =>
                                            isActive ? styles.active : ''
                                        }
                                    >
                                        Барберы
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/reviews"
                                        className={({ isActive }) =>
                                            isActive ? styles.active : ''
                                        }
                                    >
                                        Отзывы
                                    </NavLink>
                                </li>
                            </ul>

                            <div>
                                <button
                                    className={styles.adminBtn}
                                    onClick={() => {
                                        if (localStorage.getItem('admin') === 'true') {
                                            navigate('/admin')
                                        } else {
                                            setModal(true)
                                        }
                                    }}
                                >
                                    Админ-панель
                                </button>
                            </div>

                            <div className={styles.burger}>
                                <div
                                    onClick={() => setBurger(!burger)}
                                    className={styles.burgerBtn}
                                >
                                    <p className={burger ? styles.close : ''}></p>
                                </div>

                                {burger && (
                                    <div className={styles.burgerContent}>
                                        <button
                                            className={styles.mobileCloseBtn}
                                            onClick={() => setBurger(false)}
                                            aria-label="Закрыть меню"
                                        >
                                            ×
                                        </button>

                                        <div className={styles.mobileTop}>
                                            <NavLink
                                                to="/"
                                                onClick={() => setBurger(false)}
                                                className={styles.mobileLogo}
                                            >
                                                <img
                                                    src={logo}
                                                    alt="BETON Barbershop"
                                                    className={styles.mobileLogoImg}
                                                />
                                                <div className={styles.mobileLogoText}>
                                                    <h1>BETON</h1>
                                                    <p>barbershop</p>
                                                </div>
                                            </NavLink>

                                            <div className={styles.mobileContacts}>
                                                <a href="tel:+996707360005">
                                                    +996 707 360 005
                                                </a>
                                                <span>Ежедневно с 10:00 до 22:00</span>
                                            </div>
                                        </div>

                                        <ul>
                                            <li>
                                                <NavLink
                                                    onClick={() => setBurger(false)}
                                                    to="/"
                                                    className={({ isActive }) =>
                                                        isActive ? styles.active : ''
                                                    }
                                                >
                                                    Главная
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={() => setBurger(false)}
                                                    to="/services"
                                                    className={({ isActive }) =>
                                                        isActive ? styles.active : ''
                                                    }
                                                >
                                                    Услуги
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={() => setBurger(false)}
                                                    to="/doctors"
                                                    className={({ isActive }) =>
                                                        isActive ? styles.active : ''
                                                    }
                                                >
                                                    Барберы
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={() => setBurger(false)}
                                                    to="/reviews"
                                                    className={({ isActive }) =>
                                                        isActive ? styles.active : ''
                                                    }
                                                >
                                                    Отзывы
                                                </NavLink>
                                            </li>

                                            <li>
                                                <button
                                                    className={styles.mobileBookBtn}
                                                    onClick={() => {
                                                        navigate('/services')
                                                        setBurger(false)
                                                    }}
                                                >
                                                    Записаться
                                                </button>
                                            </li>

                                            <li>
                                                <button
                                                    className={styles.mobileAdminBtn}
                                                    onClick={() => {
                                                        if (localStorage.getItem('admin') === 'true') {
                                                            navigate('/admin')
                                                        } else {
                                                            setModal(true)
                                                        }
                                                        setBurger(false)
                                                    }}
                                                >
                                                    Админ-панель
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>

                    {modal && <CameModal setModal={setModal} />}
                </div>
            </div>

            <div className="outlet">
                <Outlet />
            </div>
        </>
    )
}

export default Layout
