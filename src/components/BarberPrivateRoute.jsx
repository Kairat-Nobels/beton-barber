import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function BarberPrivateRoute({ children }) {
  const { valid } = useSelector(state => state.barberReducer)

  if (!valid) {
    return <Navigate to="/barber-login" replace />
  }

  return children
}

export default BarberPrivateRoute