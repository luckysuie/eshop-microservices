package com.ecommerce.userservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * User entity - maps to the "users" table in the database.
 *
 * Lombok annotations used:
 *  @Data         = generates getters, setters, toString, equals, hashCode
 *  @Builder      = enables the builder pattern: User.builder().name("Alice").build()
 *  @NoArgsConstructor / @AllArgsConstructor = generates constructors
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    /** Primary key - auto-incremented by the database */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** User's full name */
    @Column(nullable = false)
    private String name;

    /** Email is used for login - must be unique */
    @Column(nullable = false, unique = true)
    private String email;

    /** Password (plain text for now - hash with BCrypt in production!) */
    @Column(nullable = false)
    private String password;

    /** Role: CUSTOMER (default) or ADMIN */
    @Column(nullable = false)
    @Builder.Default
    private String role = "CUSTOMER";

    /** Timestamp when the account was created */
    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
