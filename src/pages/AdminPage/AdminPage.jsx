import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Record from '../../components/Record/Record';
import { getRecords } from '../../redux/slices/recordSlice';
import { useNavigate } from 'react-router-dom';
import { outAdmin } from '../../redux/slices/adminSlice';
import ReviewAdmin from '../../components/ReviewAdmin/ReviewAdmin';
import styles from './adminPage.module.css'
import { RotatingLines } from 'react-loader-spinner'
import { getReviews } from '../../redux/slices/reviewsSlice';

function AdminPage() {
    const [choice, setChoice] = useState(0)
    const dispatch = useDispatch()
    const { records, error, loading } = useSelector(state => state.recordsReducer)
    const { reviews, error: reviewsError, loading: reviewsLoading } = useSelector(state => state.reviewsReducer)
    const { valid } = useSelector(state => state.adminReducer)
    const navigate = useNavigate()
    const today = new Date()
    const filteredRecords = records.filter(record => {
        if (!record.date) return false;
        const [day, month] = record.date.split(' ');
        const monthNum = getMonthNumber(month);
        const year = today.getFullYear();
        const hour = record.time.slice(0, 2)
        const recordDate = new Date(year, monthNum, day, hour);
        return recordDate >= today;
    });
    const allRecords = records;
    function getMonthNumber(monthName) {
        const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return monthNames.indexOf(monthName);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getRecords())
        dispatch(getReviews())
    }, [])

    // sort 
    const months = {
        'января': 0,
        'февраля': 1,
        'марта': 2,
        'апреля': 3,
        'мая': 4,
        'июня': 5,
        'июля': 6,
        'августа': 7,
        'сентября': 8,
        'октября': 9,
        'ноября': 10,
        'декабря': 11,
    };

    const parseDate = (dateStr) => {
        const [day, month] = dateStr.split(' ');
        const monthIndex = months[month];
        return new Date(new Date().getFullYear(), monthIndex, day);
    };

    const sortRecords = (records) => {
        return [...records].sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            if (dateA < dateB) {
                return -1;
            } else if (dateA > dateB) {
                return 1;
            } else {
                // Dates are equal, compare time
                if (a.time < b.time) {
                    return -1;
                } else if (a.time > b.time) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
    };

    const sortedAllRecords = sortRecords(allRecords);
    const sortedFilteredRecords = sortRecords(filteredRecords);

    const data = [sortedFilteredRecords, sortedAllRecords, reviews]

    if (valid) return (
        <div className='admin container'>
            <div className={styles.head}>
                <button onClick={() => {
                    dispatch(outAdmin())
                    navigate('/')
                }}>Выйти</button>
                <h2 className='title'>Администратор</h2 >
            </div>
            <div className={styles.sort}>
                <button className={choice === 0 ? styles.active : ''} onClick={() => { setChoice(0) }}>Актуальные Записи</button>
                <button className={choice === 1 ? styles.active : ''} onClick={() => { setChoice(1) }}>Все записи</button>
                <button className={choice === 2 ? styles.active : ''} onClick={() => { setChoice(2) }}>Отзывы</button>
            </div>
            <div className={styles.tableContainer}>
                {
                    (loading || reviewsLoading) ? <div className={styles.loading}>
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="80"
                            visible={true}
                        />
                        <p>Загрузка...</p>
                    </div>
                        :
                        (error || reviewsError) ? <h3>{error}</h3>
                            :
                            choice === 2 ?
                                <div className={styles.reviewTable}>
                                    <div className={styles.headTable}>
                                        <p>Имя</p>
                                        <p>Телефон</p>
                                        <p>Отзыв</p>
                                    </div>
                                    {data[choice].map(r => <ReviewAdmin key={r.id} data={r} />)
                                    }
                                </div>
                                :
                                <div className={styles.recordTable}>
                                    <div className={styles.headT}>
                                        <p>Имя</p>
                                        <p>Телефон</p>
                                        <p>Мастер</p>
                                        <p>Услуга</p>
                                        <p>День</p>
                                        <p>Время</p>
                                    </div>
                                    {data[choice].map(r => <Record key={r.id} data={r} />)}
                                </div>

                }
            </div>
        </div >

    )
    else return (
        <div className={styles.notWelcome}>
            <h2>Вы должны войти как администратор</h2>
            <button onClick={() => navigate('/')}>Выйти</button>
        </div>
    )
}

export default AdminPage