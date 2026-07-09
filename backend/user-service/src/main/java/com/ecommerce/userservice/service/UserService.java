package com.ecommerce.userservice.service;

import com.ecommerce.userservice.dto.*;

import java.util.List;

/**
 * UserService interface - defines all business operations for user management.
 *
 * Using an interface + implementation pattern allows:
 *  1. Easy unit testing (mock the interface)
 *  2. Multiple implementations (e.g. swap out auth strategy)
 */
public interface UserService {

    /** Register a new user account */
    UserDTO registerUser(CreateUserRequest request);

    /** Authenticate a user with email + password */
    LoginResponse login(LoginRequest request);

    /** Get user profile by ID */
    UserDTO getUserById(Long id);

    /** Get all users (admin use) */
    List<UserDTO> getAllUsers();

    /** Update user profile */
    UserDTO updateUser(Long id, CreateUserRequest request);

    /** Delete a user account */
    void deleteUser(Long id);
}
