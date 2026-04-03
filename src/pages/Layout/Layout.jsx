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
                                <img src={logo} alt="logo" className="logo" />
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
                                        <div className={styles.mobileTop}>
                                            <div className={styles.mobileLogo}>
                                                <div className={styles.logoMark}>B</div>
                                                <div className={styles.logoText}>
                                                    <h1>BETON</h1>
                                                    <p>barbershop</p>
                                                </div>
                                            </div>

                                            <div className={styles.tel}>
                                                <a href="tel:+996700123456">
                                                    +996 700 123 456
                                                </a>
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
                                                    className={styles.mobileAdminBtn}
                                                    onClick={() => {
                                                        if (
                                                            localStorage.getItem('admin') ===
                                                            'true'
                                                        ) {
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

                                        <p className={styles.mobileWorkTime}>
                                            Ежедневно с 10:00 до 22:00
                                        </p>
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
