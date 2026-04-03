import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage()
{
  return (
    <div><h2 style={{ marginTop: "50px", textAlign: "center" }}>Страница не найдена</h2>
      <Link to={'/'} className='notFountBtn'>Вернуться в главную</Link>
    </div>

  )
}

export default NotFoundPage