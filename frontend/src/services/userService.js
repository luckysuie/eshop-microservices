import { userApi } from './api'

// Register a new user account
export const registerUser = (data) =>
  userApi.post('/api/users/register', data)

// Login with email and password
export const loginUser = (data) =>
  userApi.post('/api/users/login', data)

// Get a user's profile by their ID
export const getUserById = (id) =>
  userApi.get(`/api/users/${id}`)

// Get all users (admin use)
export const getAllUsers = () =>
  userApi.get('/api/users')

// Update a user's profile
export const updateUser = (id, data) =>
  userApi.put(`/api/users/${id}`, data)
