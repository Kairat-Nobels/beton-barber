import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './reviewsPage.module.css'
import SwipperSlider from '../../components/SwipperSlider/SwipperSlider'
import Spinner from '../../components/Spinner/Spinner'
import ReviewModal from '../../components/ReviewModal/ReviewModal'

const ReviewsPage = () => {
    const { reviews, loading, error } = useSelector((state) => state.reviewsReducer)
    const [reviewModal, setReviewModal] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.head}>
                <span className={styles.label}>BETON BARBERSHOP</span>
                <h2 className="title">Отзывы клиентов</h2>
                <p className={styles.text}>
                    Мнения клиентов о сервисе, атмосфере и качестве работы наших барберов.
                </p>
            </div>

            {loading ? (
                <Spinner />
            ) : error ? (
                <div className="fetchError">
                    <p>😕 Error: {error}</p>
                    <p>Проверьте интернет и обновите страницу</p>
                </div>
            ) : (
                <div className={styles.reviews}>
                    {reviews.length > 0 ? (
                        <SwipperSlider items={reviews} />
                    ) : (
                        <h3 className={styles.empty}>Пока отзывов нет.</h3>
                    )}
                </div>
            )}

            <button onClick={() => setReviewModal(true)} className={styles.reviewBtn}>
                Оставить отзыв
            </button>

            {reviewModal && <ReviewModal setModal={setReviewModal} />}
        </div>
    )
}

export default ReviewsPage
