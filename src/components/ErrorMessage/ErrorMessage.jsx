import styles from './errorMessage.module.css'

function ErrorMessage({ message })
{
    return (
        <div className={styles.messageError}>
            <h2>Проблемка 😕 <span>{message}</span></h2>
            <p>Проверьте Интернет и Обновите страницу</p>
        </div>
    )
}

export default ErrorMessage