import { paymentApi } from './api'

// Process a payment for an order
export const processPayment = (data) =>
  paymentApi.post('/api/payments', data)

// Get payment details by payment ID
export const getPaymentById = (id) =>
  paymentApi.get(`/api/payments/${id}`)

// Get payment for a specific order
export const getPaymentByOrderId = (orderId) =>
  paymentApi.get(`/api/payments/order/${orderId}`)

// Get all payments (admin)
export const getAllPayments = () =>
  paymentApi.get('/api/payments')
