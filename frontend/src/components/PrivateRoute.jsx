import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * PrivateRoute - protects pages that require authentication.
 *
 * Usage: wrap any route element with <PrivateRoute>
 * If the user is NOT logged in, they are redirected to /login.
 * If they ARE logged in, the protected page is shown normally.
 */
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    // Not logged in: redirect to login page
    return <Navigate to="/login" replace />
  }

  // Logged in: render the protected component
  return children
}

export default PrivateRoute
