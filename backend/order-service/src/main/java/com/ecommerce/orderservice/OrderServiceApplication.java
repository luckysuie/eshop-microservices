package com.ecommerce.orderservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Order Service microservice.
 *
 * Responsibilities:
 *  - Creating orders from cart items
 *  - Tracking order status (PENDING → CONFIRMED → SHIPPED → DELIVERED)
 *  - Viewing order history per user
 *
 * Port: 8083
 */
@SpringBootApplication
public class OrderServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}
