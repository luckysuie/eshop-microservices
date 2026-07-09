import { productApi } from './api'

// Get all products
export const getAllProducts = () =>
  productApi.get('/api/products')

// Get a single product by ID
export const getProductById = (id) =>
  productApi.get(`/api/products/${id}`)

// Search products by name (partial match)
export const searchProducts = (name) =>
  productApi.get(`/api/products/search?name=${encodeURIComponent(name)}`)

// Get all products in a category
export const getProductsByCategory = (category) =>
  productApi.get(`/api/products/category/${encodeURIComponent(category)}`)

// Create a new product (admin)
export const createProduct = (data) =>
  productApi.post('/api/products', data)

// Update a product (admin)
export const updateProduct = (id, data) =>
  productApi.put(`/api/products/${id}`, data)

// Delete a product (admin)
export const deleteProduct = (id) =>
  productApi.delete(`/api/products/${id}`)
