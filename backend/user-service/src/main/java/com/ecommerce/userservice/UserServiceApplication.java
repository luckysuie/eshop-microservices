package com.ecommerce.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the User Service microservice.
 *
 * Responsibilities:
 *  - User registration
 *  - User login (authentication)
 *  - User profile management (CRUD)
 *
 * Port: 8081 (configurable via SERVER_PORT env var)
 */
@SpringBootApplication
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
