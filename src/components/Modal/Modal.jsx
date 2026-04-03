import React, { useEffect, useRef, useState } from 'react'
import styles from './modal.module.css'
import SuccessMessage from '../SuccessMessage/SuccessMessage'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { createRecord, getRecords } from '../../redux/slices/recordSlice'
import SpinnerModal from '../SpinnerModal/SpinnerModal'

const Modal = ({ setModal, data }) => {
  const [result, setResult] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedMaster, setSelectedMaster] = useState('')
  const [times, setTimes] = useState([])

  const formRef = useRef(null)

  const dispatch = useDispatch()
  const { error, loading, success, records } = useSelector(
    (state) => state.recordsReducer
  )

  const today = new Date()
  const dates = []

  for (let i = 0; i < 10; i++) {
    const date = new Date(today.getTime() + i * 86400000)
    const dateString = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    })
    const dayOfWeek = new Intl.DateTimeFormat('ru-RU', {
      weekday: 'long',
    }).format(date)

    if (dayOfWeek !== 'воскресенье') {
      dates.push({ date: dateString, dayOfWeek })
    }
  }

  const generateTimes = () => {
    const arr = []
    for (let hour = 9; hour < 22; hour++) {
      arr.push(`${hour.toString().padStart(2, '0')}:00`)
    }
    return arr
  }

  const updateAvailableTimes = (
    dateVal = selectedDate,
    serviceVal = selectedService,
    masterVal = selectedMaster
  ) => {
    if (!dateVal || !serviceVal || !masterVal) {
      setTimes([])
      return
    }

    const baseTimes = generateTimes()

    const filtered = baseTimes.filter((time) => {
      return !records.some(
        (r) =>
          r.date === dateVal &&
          r.time === time &&
          r.service === serviceVal &&
          r.master === masterVal
      )
    })

    setTimes(filtered)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    dispatch(getRecords())

    return () => {
      document.body.style.overflow = ''
    }
  }, [dispatch])

  const handlePhoneNumberChange = (event) => {
    let input = event.target.value.replace(/\D/g, '')

    if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
      setIsValid(false)
      setPhone(input)
      return
    }

    input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, '($1)-$2-$3')
    setIsValid(true)
    setPhone(input)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setResult(true)

    const rec = {
      type: 1,
      name,
      phone,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      master: selectedMaster,
    }

    dispatch(createRecord(rec))
  }

  const closeModal = (e) => {
    if (formRef.current && !formRef.current.contains(e.target) && !result) {
      setModal(false)
    }
  }

  const handleClose = () => {
    setModal(false)
  }

  const handleFinish = () => {
    setModal(false)
    setResult(false)
  }

  return (
    <div onClick={closeModal} className={styles.window}>
      <form ref={formRef} className={styles.card} onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={handleClose}
          className={styles.closeX}
          aria-label="Закрыть"
        >
          ×
        </button>

        <h2>Запись в барбершоп</h2>
        <p className={styles.subtitle}>
          Выберите услугу, мастера, дату и удобное время
        </p>

        {result ? (
          loading ? (
            <div className={styles.loading}>
              <SpinnerModal />
              <p>Идёт запись...</p>
            </div>
          ) : (
            <div className={styles.message}>

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
              <label htmlFor="name">Имя</label>
              <input
                placeholder="Введите имя"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
              {!isValid && phone.length > 0 && (
                <p className={styles.errorNum}>Номер телефона введён неправильно</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="service">Услуга</label>
              <select
                id="service"
                required
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value)
                  updateAvailableTimes(selectedDate, e.target.value, selectedMaster)
                  setSelectedDate('')
                  setSelectedTime('')
                }}
              >
                <option value="">Выберите услугу</option>
                {data.categories?.map((service) => (
                  <option key={service.name} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="master">Мастер</label>
              <select
                id="master"
                required
                value={selectedMaster}
                onChange={(e) => {
                  setSelectedMaster(e.target.value)
                  updateAvailableTimes(selectedDate, selectedService, e.target.value)
                  setSelectedDate('')
                  setSelectedTime('')
                }}
              >
                <option value="">Выберите мастера</option>
                {data.doctors?.map((master) => (
                  <option key={master.name} value={master.name}>
                    {master.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="date">Дата</label>
              <select
                id="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value)
                  updateAvailableTimes(e.target.value, selectedService, selectedMaster)
                  setSelectedTime('')
                }}
                required
              >
                <option value="" disabled>
                  Выберите дату
                </option>
                {dates.map((date) => (
                  <option key={date.date} value={date.date}>
                    {`${date.dayOfWeek}, ${date.date}`}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="time">Время</label>
              <select
                disabled={!selectedDate}
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              >
                <option value="" disabled>
                  Выберите время
                </option>
                {times
                  .filter((time) =>
                    today.toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                    }) === selectedDate
                      ? Number(time.slice(0, 2)) >= today.getHours() + 1
                      : true
                  )
                  .map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
              </select>
            </div>

            <button type="submit" disabled={!isValid} className={styles.submitBtn}>
              Записаться
            </button>
          </>
        )}
      </form>
    </div>
  )
}

export default Modal
