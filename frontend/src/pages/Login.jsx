import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginUser } from '../services/userService'
import PageWrapper from '../components/PageWrapper'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      const response = await loginUser({ email, password })
      login(response.data)
      navigate('/')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <div className="container page-section">
        <div className="glass-card auth-card">
          <div className="auth-header">
            <div className="auth-header-icon">👋</div>
            <h3 className="fw-bold mb-1">Welcome Back</h3>
            <p className="text-muted small">Sign in to your ShopEase account</p>
          </div>

          <div className="auth-body">
            {error && <div className="alert alert-custom alert-danger-custom py-2 mb-3">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label-custom">Email Address</label>
                <input
                  type="email"
                  className="form-control form-control-custom w-100"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label className="form-label-custom">Password</label>
                <input
                  type="password"
                  className="form-control form-control-custom w-100"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary-custom w-100 btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span>Logging in...</>
                ) : 'Login'}
              </button>
            </form>

            <hr className="my-4" />
            <p className="text-center mb-0 text-muted">
              Don't have an account?{' '}
              <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: 'var(--primary)' }}>
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Login
