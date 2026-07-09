import { orderApi } from './api'

// Create a new order
export const createOrder = (data) =>
  orderApi.post('/api/orders', data)

// Get all orders for a specific user
export const getOrdersByUser = (userId) =>
  orderApi.get(`/api/orders/user/${userId}`)

// Get a single order by ID
export const getOrderById = (id) =>
  orderApi.get(`/api/orders/${id}`)

// Get all orders (admin)
export const getAllOrders = () =>
  orderApi.get('/api/orders')

// Update the status of an order (e.g. PENDING -> CONFIRMED)
export const updateOrderStatus = (id, status) =>
  orderApi.put(`/api/orders/${id}/status?status=${status}`)
