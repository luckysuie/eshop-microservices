import axios from 'axios'

/**
 * Axios instances for each microservice.
 *
 * In Docker / production (nginx proxy): base URL is '' (empty) so all calls
 * are relative (e.g. /api/users/register) and nginx routes them to the
 * correct backend container.
 *
 * In local dev (Vite dev server): base URL is still '' and Vite's proxy
 * (configured in vite.config.js) forwards /api/* to the correct service port.
 *
 * To override for a specific deploy, set VITE_*_URL env vars at build time.
 */

export const userApi = axios.create({
  baseURL: import.meta.env.VITE_USER_SERVICE_URL || '',
  headers: { 'Content-Type': 'application/json' },
})

export const productApi = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_SERVICE_URL || '',
  headers: { 'Content-Type': 'application/json' },
})

export const orderApi = axios.create({
  baseURL: import.meta.env.VITE_ORDER_SERVICE_URL || '',
  headers: { 'Content-Type': 'application/json' },
})

export const paymentApi = axios.create({
  baseURL: import.meta.env.VITE_PAYMENT_SERVICE_URL || '',
  headers: { 'Content-Type': 'application/json' },
})
