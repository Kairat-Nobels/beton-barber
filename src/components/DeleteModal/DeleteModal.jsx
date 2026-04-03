import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import { deleteRecord, getRecords } from '../../redux/slices/recordSlice';
import styles from './deleteModal.module.css';
import { RotatingLines } from 'react-loader-spinner'
import { deleteReview, getReviews } from '../../redux/slices/reviewsSlice';

function DeleteModal({ setModal, data }) {
    const [result, setResult] = useState(false)
    const dispatch = useDispatch()
    const { delError, delLoading, delMessage } = useSelector(state => data.date ? state.recordsReducer : state.reviewsReducer)

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, [])
    const closeModal = (e) => {
        if (!document.querySelector('section').contains(e.target) && !result) {
            document.body.style.overflow = '';
            setModal(false)
        }
    }
    const hadnleDelete = () => {
        setResult(true)
        data.date ? dispatch(deleteRecord(data.id)) : dispatch(deleteReview(data.id))
    }
    return (
        <div onClick={closeModal} className={styles.window}>
            <section className={styles.form}>
                <h2 className='title'>Удаление</h2>

                {
                    result ?
                        (delLoading ? <div className={styles.loading}>
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="80"
                                visible={true}
                            />
                            <span className={styles.p}>Удаление...</span>
                        </div> :
                            <div>
                                <button className={styles.closeBtn} onClick={() => {
                                    dispatch(getRecords())
                                    dispatch(getReviews())
                                    document.body.style.overflow = ''
                                    setModal(false)
                                    setResult(false)
                                }
                                }>X</button>
                                {
                                    delError ? <ErrorMessage message={delError} /> :
                                        <SuccessMessage message={delMessage} />
                                }
                            </div>
                        )
                        :
                        <div className={styles.quiz}>
                            <h2>Вы уверены что хотите удалить?</h2>
                            <div className={styles.quizActions}>
                                <button className={styles.quizActionsBtn} onClick={hadnleDelete}>Да</button>
                                <button className={styles.quizActionsBtn} onClick={() => {
                                    document.body.style.overflow = ''
                                    setModal(false)
                                }}>Нет</button>
                            </div>
                        </div>
                }
            </section>
        </div >
    )
}

export default DeleteModal