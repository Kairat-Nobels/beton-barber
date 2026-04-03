import styles from './homePage.module.css'
import hello from '../../assets/images/hello2.png'
import searchIcon from '../../assets/images/searchIcon.png'
import serviceIcon from '../../assets/images/serviceIcon.png'
import about from '../../assets/images/about.png'
import { useSelector } from 'react-redux'
import HomeCards from '../../components/HomeCards/HomeCards'
import SwipperSlider from '../../components/SwipperSlider/SwipperSlider'
import HomeDoctors from '../../components/HomeDoctors/HomeDoctors'
import { NavLink } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from 'react'
import ReviewModal from '../../components/ReviewModal/ReviewModal'
import Spinner from '../../components/Spinner/Spinner'

function HomePage() {
  const [modal, setModal] = useState(false)
  const [more, setMore] = useState(false)

  const { reviews } = useSelector(state => state.reviewsReducer)
  const { doctors, loading, error } = useSelector(state => state.doctorsReducer)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Сообщение отправлено')
    e.target.reset()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* HERO */}
      <div className={styles.hello}>
        <div className={styles.helloInner}>
          <div className={styles.left}>
            <span className={styles.heroLabel}>BETON BARBERSHOP</span>

            <h1>Место, где стиль становится частью тебя</h1>

            <p>
              <span>BETON Barbershop</span> — это современные мужские стрижки,
              аккуратное оформление бороды, уверенный сервис и атмосфера, в которую
              хочется возвращаться. Мы работаем с образом в целом, чтобы после визита
              ты выглядел собранно, стильно и дорого.
            </p>

            <div className={styles.heroButtons}>
              <a href="#homeCards">Почему выбирают нас</a>
              <button onClick={() => setModal(true)} className={styles.heroBtnSecondary}>
                Оставить отзыв
              </button>
            </div>
          </div>

          <div className={styles.right}>
            <img src={hello} alt="BETON Barbershop" />
          </div>
        </div>
      </div>

      <div className="container">
        <HomeCards />

        {/* ABOUT */}
        <div className={styles.about}>
          <div className={styles.aboutHead}>
            <span className={styles.aboutLabel}>BETON BARBERSHOP</span>
            <h2 className={styles.aboutTitle}>О барбершопе</h2>
          </div>

          <div className={styles.aboutDiv}>
            <div className={styles.aboutText}>
              <p>
                BETON — это не просто место, где можно подровнять волосы или оформить
                бороду. Это пространство, где важны подача, точность, чистота работы
                и общее впечатление после визита. Мы смотрим не только на технику,
                но и на то, как стрижка будет сочетаться с формой лица, стилем одежды
                и характером клиента.
              </p>

              <p>
                Для нас барбершоп — это сочетание мастерства и атмосферы. Здесь можно
                прийти не только за услугой, но и за ощущением уверенности. Мы делаем
                классические и современные мужские стрижки, работаем с fade, аккуратно
                оформляем бороду и следим за тем, чтобы итоговый образ выглядел
                собранно и естественно.
              </p>

              <p>
                Каждый мастер в нашей команде понимает, что хороший результат строится
                на деталях: точных линиях, правильной длине, чистой форме и умении
                услышать клиента. Поэтому мы не работаем шаблонно — мы подбираем
                решение под конкретного человека.
              </p>

              <div className={styles.aboutList}>
                <div className={styles.aboutItem}>Мужские стрижки и fade</div>
                <div className={styles.aboutItem}>Оформление бороды и усов</div>
                <div className={styles.aboutItem}>Точный подбор формы</div>
                <div className={styles.aboutItem}>Комфортная атмосфера</div>
              </div>

              {more && (
                <>
                  <p>
                    В работе мы используем качественные инструменты и профессиональную
                    косметику, чтобы сохранить чистоту формы, аккуратную текстуру и
                    ухоженный вид после визита. Для нас важно, чтобы результат хорошо
                    смотрелся не только сразу после кресла, но и в повседневной жизни.
                  </p>

                  <p>
                    Мы ценим время клиента, поэтому стараемся сочетать качество,
                    комфорт и понятный сервис. В BETON можно прийти за обновлением
                    образа, поддержанием привычного стиля или полной сменой подачи —
                    и в каждом случае получить внимание к деталям и аккуратный результат.
                  </p>

                  <p>
                    Если тебе важны атмосфера, уверенная техника и барбершоп, в который
                    действительно хочется возвращаться, BETON — именно такое место.
                  </p>
                </>
              )}

              <span
                onClick={() => setMore(!more)}
                className={styles.moreBtn}
              >
                {more ? 'Скрыть' : 'Подробнее'}
              </span>
            </div>

            <div className={styles.aboutLine}>
              <img src={about} alt="Barbershop interior" />
            </div>
          </div>

          <div className={styles.reviewsModal}>
            <div className={styles.docLink}>
              <NavLink to={'/services'}>
                <p>Все услуги</p>
                <div><img src={serviceIcon} alt="" /></div>
              </NavLink>
            </div>

            <button onClick={() => setModal(true)}>
              Оставить отзыв
            </button>
          </div>

          {modal && <ReviewModal setModal={setModal} />}
        </div>

        {/* BARBERS */}
        <div className={styles.doctors}>
          <h2 className="title">Наши барберы</h2>

          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="fetchError">
              <p>😕 Error: {error}</p>
              <p>Проверь интернет и попробуй обновить страницу</p>
            </div>
          ) : (
            <>
              <div className={styles.cardsDoc}>
                {doctors
                  .slice(0, 6)
                  .filter((_, i) => i % 2 === 0)
                  .map((s) => (
                    <HomeDoctors key={s.id} data={s} />
                  ))}
              </div>

              <div className={styles.docLink}>
                <NavLink to={'/doctors'}>
                  <p>Все барберы</p>
                  <div><img src={searchIcon} alt="" /></div>
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>

      {/* REVIEWS */}
      <div className={styles.reviews}>
        {reviews.length > 0 && <SwipperSlider items={reviews} />}
      </div>

      {/* CONTACT */}
      <div className="container">
        <div className={styles.feedBack}>
          <div className={styles.maps}>
            <iframe
              title="BETON Barbershop map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2844.7422943396928!2d74.58459667587569!3d42.85775130351419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec92fa2ce8ad7%3A0xc93096b0d50cefca!2sBeton%20Barbershop!5e1!3m2!1sru!2sus!4v1775183378152!5m2!1sru!2sus"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className={styles.sendMes}>
            <h2>Связаться с нами</h2>
            <p>Оставь сообщение или задай вопрос</p>

            <form onSubmit={handleSubmit} className={styles.formMes}>
              <div>
                <label>Имя:</label>
                <input required type="text" />
              </div>

              <div>
                <label>Email:</label>
                <input required type="email" />
              </div>

              <div className={styles.message}>
                <label>Сообщение:</label>
                <textarea required rows="4"></textarea>
              </div>

              <button type="submit">Отправить</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default HomePage
