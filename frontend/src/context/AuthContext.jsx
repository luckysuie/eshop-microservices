import { createContext, useContext, useState } from 'react'

// Create the context object
const AuthContext = createContext()

/**
 * AuthProvider wraps the app and makes auth state available to all components.
 * It stores the logged-in user in localStorage so the session persists on refresh.
 */
export function AuthProvider({ children }) {
  // Load user from localStorage when the app first loads
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  // Called after successful login - saves user data
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Called on logout - clears user data
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // true if a user is logged in, false otherwise
  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook - use this in any component to access auth state
// Example: const { user, login, logout } = useAuth()
export function useAuth() {
  return useContext(AuthContext)
}
