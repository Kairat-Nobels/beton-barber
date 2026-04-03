import { useEffect, useRef, useState } from 'react'
import styles from './reviewModal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import SuccessMessage from '../SuccessMessage/SuccessMessage'
import SpinnerModal from '../SpinnerModal/SpinnerModal'
import { createReview, getReviews } from '../../redux/slices/reviewsSlice'

function ReviewModal({ setModal }) {
    const [result, setResult] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [comment, setComment] = useState('')
    const [isValid, setIsValid] = useState(false)

    const dispatch = useDispatch()
    const formRef = useRef(null)

    const { error, loading, success } = useSelector(
        (state) => state.reviewsReducer
    )

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    const closeModal = (e) => {
        if (formRef.current && !formRef.current.contains(e.target) && !result) {
            setModal(false)
        }
    }

    const handlePhoneNumberChange = (event) => {
        let input = event.target.value
        input = input.replace(/\D/g, '')

        if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
            setIsValid(false)
            setPhone(input)
            return
        }

        input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, '($1)-$2-$3')
        setIsValid(/^\(\d{3}\)-\d{3}-\d{3}$/.test(input))
        setPhone(input)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setResult(true)

        const rew = {
            name,
            phone,
            comment,
        }

        dispatch(createReview(rew))
    }

    const handleClose = () => {
        setModal(false)
    }

    const handleFinish = () => {
        dispatch(getReviews())
        setModal(false)
        setResult(false)
    }

    return (
        <div onClick={closeModal} className={styles.window}>
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
                <button
                    type="button"
                    onClick={handleClose}
                    className={styles.closeX}
                    aria-label="Закрыть"
                >
                    ×
                </button>

                <h2>Оставить отзыв</h2>
                <p className={styles.subtitle}>
                    Поделитесь впечатлением о сервисе и атмосфере барбершопа
                </p>

                {result ? (
                    loading ? (
                        <div className={styles.loading}>
                            <SpinnerModal />
                            <p>Отзыв отправляется...</p>
                        </div>
                    ) : (
                        <div className={styles.resultBlock}>
                            <button
                                type="button"
                                className={styles.closeBtn}
                                onClick={handleFinish}
                            >
                                ×
                            </button>

                            {error ? (
                                <ErrorMessage message={error} />
                            ) : (
                                <SuccessMessage message={success} />
                            )}
                        </div>
                    )
                ) : (
                    <>
                        <div className={styles.field}>
                            <label>Имя</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                type="text"
                                placeholder="Введите имя"
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="phone">Телефон</label>
                            <input
                                type="tel"
                                placeholder="777222333"
                                id="phone"
                                value={phone}
                                onChange={handlePhoneNumberChange}
                                required
                            />
                        </div>

                        {!isValid && phone.length > 0 && (
                            <p className={styles.errorNum}>
                                Номер телефона введён неправильно
                            </p>
                        )}

                        <div className={`${styles.field} ${styles.textareaField}`}>
                            <label>Отзыв</label>
                            <textarea
                                maxLength={320}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                rows="5"
                                placeholder="Напишите ваш отзыв"
                            ></textarea>
                        </div>

                        <button
                            disabled={!isValid}
                            className={styles.submitBtn}
                            type="submit"
                        >
                            Отправить
                        </button>
                    </>
                )}
            </form>
        </div>
    )
}

export default ReviewModal
