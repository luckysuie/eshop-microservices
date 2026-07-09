package com.ecommerce.userservice.repository;

import com.ecommerce.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * UserRepository - handles all database operations for the User entity.
 *
 * By extending JpaRepository<User, Long>, Spring automatically provides:
 *  - save(), findById(), findAll(), deleteById(), existsById(), etc.
 *
 * We add two custom methods using Spring Data's query derivation.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find a user by email address.
     * Spring Data translates this method name into:
     *   SELECT * FROM users WHERE email = ?
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if an email is already registered (to prevent duplicates).
     * Spring Data translates this into:
     *   SELECT COUNT(*) > 0 FROM users WHERE email = ?
     */
    boolean existsByEmail(String email);
}
