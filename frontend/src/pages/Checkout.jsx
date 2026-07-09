import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../services/orderService'
import { processPayment } from '../services/paymentService'
import PageWrapper from '../components/PageWrapper'

const PAYMENT_METHODS = [
  { id: 'CREDIT_CARD', label: 'Credit Card', icon: '💳' },
  { id: 'DEBIT_CARD', label: 'Debit Card', icon: '💳' },
  { id: 'UPI', label: 'UPI', icon: '📱' },
  { id: 'NET_BANKING', label: 'Net Banking', icon: '🏦' },
]

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    try {
      setLoading(true)
      setError('')

      const orderData = {
        userId: user.id,
        totalAmount: totalPrice,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      }
      const orderResponse = await createOrder(orderData)
      const orderId = orderResponse.data.id

      const paymentData = {
        orderId: orderId,
        amount: totalPrice,
        paymentMethod: paymentMethod,
      }
      await processPayment(paymentData)

      clearCart()
      navigate('/orders')
    } catch (err) {
      setError('Checkout failed. Please try again.')
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <div className="container page-section">
        <div className="page-header animate-fade-in-up">
          <h2 className="page-title">Checkout</h2>
          <p className="page-subtitle">Review your order and complete payment</p>
        </div>

        {error && <div className="alert alert-custom alert-danger-custom mb-4">{error}</div>}

        <div className="row g-4">
          <div className="col-md-6 animate-fade-in-up animate-delay-1">
            <div className="glass-card p-4">
              <h5 className="fw-bold mb-3">Order Summary</h5>
              {cartItems.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span className="text-muted">{item.name} × {item.quantity}</span>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <strong>Total</strong>
                <span className="total-amount">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="col-md-6 animate-fade-in-up animate-delay-2">
            <div className="glass-card p-4">
              <h5 className="fw-bold mb-3">Payment Method</h5>
              {PAYMENT_METHODS.map(method => (
                <div
                  key={method.id}
                  className={`payment-option ${paymentMethod === method.id ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <input
                    className="form-check-input m-0"
                    type="radio"
                    id={method.id}
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                  />
                  <span>{method.icon}</span>
                  <label className="form-check-label fw-semibold mb-0" htmlFor={method.id} style={{ cursor: 'pointer' }}>
                    {method.label}
                  </label>
                </div>
              ))}
              <hr />
              <button
                className="btn btn-success-custom w-100 btn-lg"
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
              >
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span>Processing...</>
                ) : (
                  `Pay $${totalPrice.toFixed(2)}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Checkout
