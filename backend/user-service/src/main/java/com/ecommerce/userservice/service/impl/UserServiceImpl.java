package com.ecommerce.userservice.service.impl;

import com.ecommerce.userservice.dto.*;
import com.ecommerce.userservice.entity.User;
import com.ecommerce.userservice.repository.UserRepository;
import com.ecommerce.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * UserServiceImpl - implements all user business logic.
 *
 * NOTE: In production, always hash passwords using BCrypt before saving!
 * This demo uses plain text passwords for simplicity.
 */
@Service
public class UserServiceImpl implements UserService {

    // Spring injects the repository automatically
    @Autowired
    private UserRepository userRepository;

    /**
     * Register a new user.
     * Throws an exception if the email is already taken.
     */
    @Override
    public UserDTO registerUser(CreateUserRequest request) {
        // Check for duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered: " + request.getEmail());
        }

        // Build and save the new user
        // TODO: Replace request.getPassword() with BCryptPasswordEncoder.encode() in production
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();

        User saved = userRepository.save(user);
        return mapToDTO(saved);
    }

    /**
     * Authenticate a user.
     * In production, use BCrypt.matches() to compare hashed passwords.
     */
    @Override
    public LoginResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("No account found with email: " + request.getEmail()));

        // Verify password (plain text comparison for demo)
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid credentials. Please check your password.");
        }

        return LoginResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .message("Login successful")
                .build();
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return mapToDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        // Fetch all users, convert each to DTO, return as list
        return userRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Long id, CreateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        // Only update password if a new one is provided
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(request.getPassword());
        }

        return mapToDTO(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    /**
     * Helper method: converts a User entity to UserDTO.
     * We use this everywhere to avoid sending passwords to clients.
     */
    private UserDTO mapToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
