import { useLocation, useNavigate } from "react-router-dom"
import Category from "../../components/Category/Category"
import Doctor from "../../components/Doctor/Doctor"
import { useEffect, useState } from "react"
import Modal from "../../components/Modal/Modal"
import styles from './serviceAboutPage.module.css'
import ReviewModal from "../../components/ReviewModal/ReviewModal"

function ServiceAboutPage() {
    const [modal, setModal] = useState(false)
    const [reviewModal, setReviewModal] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                ← Назад
            </button>

            <div className={styles.about}>
                <div className={styles.topLabel}>BETON BARBERSHOP</div>
                <h3 className={styles.title}>{data.name}</h3>

                <div className={styles.aboutHead}>
                    <div className={styles.textBlock}>
                        <p>{data.description}</p>
                    </div>

                    <div className={styles.image}>
                        <img src={data.img} alt={data.name} />
                    </div>
                </div>
            </div>

            <div className={styles.flex}>
                <div className={styles.service}>
                    <h4>Прайс и услуги</h4>
                    <div className={styles.innerBox}>
                        {data.categories.map((obj) => (
                            <Category key={obj.name} obj={obj} />
                        ))}
                    </div>
                </div>

                <div className={styles.doctors}>
                    <h4>Мастера</h4>
                    <div className={styles.innerBox}>
                        {data.doctors.map((obj) => (
                            <Doctor key={obj.name} obj={obj} />
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button onClick={() => setModal(true)} className={styles.primaryBtn}>
                    Записаться
                </button>
                <button onClick={() => setReviewModal(true)} className={styles.secondaryBtn}>
                    Оставить отзыв
                </button>
            </div>

            {modal && <Modal setModal={setModal} data={data} />}
            {reviewModal && <ReviewModal setModal={setReviewModal} />}
        </div>
    )
}

export default ServiceAboutPage
