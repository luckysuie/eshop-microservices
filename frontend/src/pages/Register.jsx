import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/userService'
import PageWrapper from '../components/PageWrapper'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setLoading(true)
      setError('')
      await registerUser({ name: form.name, email: form.email, password: form.password })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <div className="container page-section">
        <div className="glass-card auth-card">
          <div className="auth-header">
            <div className="auth-header-icon">✨</div>
            <h3 className="fw-bold mb-1">Create Account</h3>
            <p className="text-muted small">Join ShopEase and start shopping</p>
          </div>

          <div className="auth-body">
            {error && <div className="alert alert-custom alert-danger-custom py-2 mb-3">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label-custom">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-custom w-100"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label-custom">Email Address</label>
                <input
                  type="email"
                  className="form-control form-control-custom w-100"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label-custom">Password</label>
                <input
                  type="password"
                  className="form-control form-control-custom w-100"
                  name="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
              <div className="mb-4">
                <label className="form-label-custom">Confirm Password</label>
                <input
                  type="password"
                  className="form-control form-control-custom w-100"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary-custom w-100 btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span>Creating account...</>
                ) : 'Register'}
              </button>
            </form>

            <hr className="my-4" />
            <p className="text-center mb-0 text-muted">
              Already have an account?{' '}
              <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: 'var(--primary)' }}>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Register
