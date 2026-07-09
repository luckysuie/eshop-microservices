package com.ecommerce.productservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Product Service microservice.
 *
 * Responsibilities:
 *  - Product catalog (create, read, update, delete products)
 *  - Search products by name
 *  - Filter products by category
 *
 * Port: 8082 (configurable via SERVER_PORT env var)
 */
@SpringBootApplication
public class ProductServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }
}
