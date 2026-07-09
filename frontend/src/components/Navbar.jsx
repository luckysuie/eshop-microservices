import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const { totalItems, cartPulse } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container">
        <Link className="navbar-brand navbar-brand-custom" to="/">
          ShopEase
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto ms-lg-3">
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${isActive('/')}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${isActive('/products')}`} to="/products">Products</Link>
            </li>
          </ul>

          <ul className="navbar-nav align-items-lg-center gap-lg-1">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/cart">
                    Cart
                    {totalItems > 0 && (
                      <span className={`badge cart-badge rounded-pill ms-1 ${cartPulse ? 'bounce' : ''}`}>
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link nav-link-custom ${isActive('/orders')}`} to="/orders">My Orders</Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link nav-link-custom dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    {user?.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg" style={{ borderRadius: '12px' }}>
                    <li>
                      <button className="dropdown-item text-danger fw-semibold" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn-nav-register ms-lg-2" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
