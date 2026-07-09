package com.ecommerce.productservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Product entity - maps to the "products" table in the database.
 */
@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Product name - required */
    @Column(nullable = false)
    private String name;

    /** Detailed product description */
    @Column(length = 2000)
    private String description;

    /** Price in USD - required, must be positive */
    @Column(nullable = false)
    private Double price;

    /** Available inventory count */
    @Column(nullable = false)
    @Builder.Default
    private Integer stock = 0;

    /** Category: Electronics, Clothing, Books, etc. */
    private String category;

    /** Timestamp when the product was added */
    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
