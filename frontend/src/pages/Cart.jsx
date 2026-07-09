import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <PageWrapper>
        <div className="container page-section">
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h3 className="fw-bold">Your cart is empty</h3>
            <p className="text-muted mb-4">Browse our products and add something you love!</p>
            <button className="btn btn-primary-custom btn-lg" onClick={() => navigate('/products')}>
              Browse Products
            </button>
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="container page-section">
        <div className="page-header animate-fade-in-up">
          <h2 className="page-title">Shopping Cart</h2>
          <p className="page-subtitle">{cartItems.reduce((s, i) => s + i.quantity, 0)} items in your cart</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="cart-item-card d-flex justify-content-between align-items-center flex-wrap gap-3"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div>
                  <h6 className="mb-1 fw-bold">{item.name}</h6>
                  <small className="text-muted">${item.price?.toFixed(2)} each</small>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >−</button>
                    <span className="fw-semibold px-2">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <strong className="product-price" style={{ fontSize: '1rem' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <button className="btn btn-outline-custom btn-sm" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <div className="col-lg-4">
            <div className="summary-card animate-fade-in-up animate-delay-2">
              <h5 className="fw-bold mb-3">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2 text-muted">
                <span>Items ({cartItems.reduce((s, i) => s + i.quantity, 0)}):</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-4">
                <strong>Total:</strong>
                <span className="total-amount">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                className="btn btn-success-custom w-100 btn-lg"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Cart
