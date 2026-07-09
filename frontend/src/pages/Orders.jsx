import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getOrdersByUser } from '../services/orderService'
import LoadingSpinner from '../components/LoadingSpinner'
import PageWrapper from '../components/PageWrapper'

function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await getOrdersByUser(user.id)
        setOrders(response.data)
      } catch (err) {
        setError('Failed to load orders. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [user.id])

  const statusStyle = (status) => {
    const map = {
      PENDING: { bg: 'rgba(245, 158, 11, 0.12)', color: '#b45309' },
      CONFIRMED: { bg: 'rgba(59, 130, 246, 0.12)', color: '#1d4ed8' },
      SHIPPED: { bg: 'rgba(99, 102, 241, 0.12)', color: '#4338ca' },
      DELIVERED: { bg: 'rgba(16, 185, 129, 0.12)', color: '#047857' },
      CANCELLED: { bg: 'rgba(239, 68, 68, 0.12)', color: '#b91c1c' },
    }
    return map[status] || { bg: 'rgba(148, 163, 184, 0.12)', color: '#475569' }
  }

  if (loading) return <LoadingSpinner message="Loading your orders..." />

  return (
    <PageWrapper>
      <div className="container page-section">
        <div className="page-header animate-fade-in-up">
          <h2 className="page-title">My Orders</h2>
          <p className="page-subtitle">Track and review your past purchases</p>
        </div>

        {error && <div className="alert alert-custom alert-danger-custom mb-4">{error}</div>}

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h4 className="fw-bold">No orders yet</h4>
            <p className="text-muted">Place your first order to see it here.</p>
          </div>
        ) : (
          orders.map((order, index) => {
            const style = statusStyle(order.status)
            return (
              <div
                key={order.id}
                className="order-card"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="order-card-header">
                  <span className="fw-bold">Order #{order.id}</span>
                  <span
                    className="status-badge"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {order.status?.toLowerCase()}
                  </span>
                </div>
                <div className="p-4">
                  <div className="row g-3">
                    <div className="col-sm-4">
                      <small className="text-muted d-block">Total Amount</small>
                      <span className="product-price">${order.totalAmount?.toFixed(2)}</span>
                    </div>
                    <div className="col-sm-4">
                      <small className="text-muted d-block">Placed On</small>
                      <span className="fw-semibold">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="col-sm-4">
                      <small className="text-muted d-block">Items</small>
                      <span className="fw-semibold">{order.items?.length || 0} item(s)</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </PageWrapper>
  )
}

export default Orders
