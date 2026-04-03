import { NavLink } from 'react-router-dom'
import styles from './footer.module.css'
import whats from '../../assets/images/whatsApp.png'
import insta from '../../assets/images/Instagram.png'
import faceBookicon from '../../assets/images/faceBookicon.png'
import logo from '../../assets/logo.png'
function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.top}>
                    <NavLink className={styles.logo} to='/'>
                        <img src={logo} width={60} alt="logo" className="logo" />
                        <div className={styles.logoText}>
                            <h2>BETON</h2>
                            <p>barbershop</p>
                        </div>
                    </NavLink>

                    <div className={styles.center}>
                        <p className={styles.desc}>
                            Современные мужские стрижки, оформление бороды и
                            атмосфера, в которую хочется возвращаться.
                        </p>
                    </div>

                    <div className={styles.actions}>
                        <NavLink className={styles.linkBtn} to='/services'>
                            Записаться
                        </NavLink>
                    </div>
                </div>

                <div className={styles.middle}>
                    <div className={styles.contacts}>
                        <p className={styles.label}>Контакты</p>
                        <a href='tel:+996707360005' className={styles.phone}>
                            +996 707 360 005
                        </a>
                        <a href='mailto:beton.barbershop@gmail.com' className={styles.mail}>
                            beton.barbershop@gmail.com
                        </a>
                    </div>

                    <div className={styles.schedule}>
                        <p className={styles.label}>Режим работы</p>
                        <p>Ежедневно: 10:00 — 22:00</p>
                    </div>

                    <div className={styles.socials}>
                        <p className={styles.label}>Соцсети</p>
                        <ul>
                            <li>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://www.facebook.com/'
                                >
                                    <div><img src={faceBookicon} alt="Facebook" /></div>
                                </a>
                            </li>
                            <li>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://www.instagram.com/beton.barbershop/'
                                >
                                    <div><img src={insta} alt="Instagram" /></div>
                                </a>
                            </li>
                            <li>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://wa.me/996707360005'
                                >
                                    <div><img src={whats} alt="WhatsApp" /></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© 2026 BETON Barbershop. Все права защищены.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
