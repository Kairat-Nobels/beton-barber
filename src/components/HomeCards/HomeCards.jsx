import styles from './homeCards.module.css'

import {
    Scissors,
    User,
    Sparkles,
    Star,
    Coffee,
    Calendar
} from 'lucide-react'

function HomeCards() {
    return (
        <div id='homeCards' className={styles.cardPage}>
            <h2>Почему выбирают наш барбершоп</h2>

            <div className={styles.cards}>

                <div className={styles.card}>
                    <Scissors className={styles.icon} />
                    <h3>Точные и стильные стрижки</h3>
                    <p>
                        Современные и классические мужские стрижки,
                        подобранные под форму лица и стиль.
                    </p>
                </div>

                <div className={styles.card}>
                    <User className={styles.icon} />
                    <h3>Индивидуальный подход</h3>
                    <p>
                        Мы учитываем особенности внешности и пожелания,
                        чтобы создать идеальный образ.
                    </p>
                </div>

                <div className={styles.card}>
                    <Sparkles className={styles.icon} />
                    <h3>Уход за бородой</h3>
                    <p>
                        Чёткие контуры, аккуратная форма и ухоженный вид —
                        всё, что нужно для стильного образа.
                    </p>
                </div>

                <div className={styles.card}>
                    <Star className={styles.icon} />
                    <h3>Профессиональные барберы</h3>
                    <p>
                        Опытные мастера, которые знают тренды
                        и работают на результат.
                    </p>
                </div>

                <div className={styles.card}>
                    <Coffee className={styles.icon} />
                    <h3>Атмосфера и комфорт</h3>
                    <p>
                        Музыка, стильный интерьер и место,
                        где можно расслабиться и перезагрузиться.
                    </p>
                </div>

                <div className={styles.card}>
                    <Calendar className={styles.icon} />
                    <h3>Удобная запись</h3>
                    <p>
                        Быстрая онлайн-запись и удобное время —
                        без лишней суеты.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default HomeCards
