package com.ecommerce.orderservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

/**
 * OrderItem entity - represents one product line in an order.
 *
 * For example: "2x Laptop Pro @ $999.99 each"
 *
 * @JsonIgnore on the 'order' field prevents infinite recursion when
 * serializing to JSON (Order -> OrderItem -> Order -> ...)
 */
@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Back-reference to the parent Order.
     * @JsonIgnore prevents this from being included in JSON output
     * (avoids circular reference / infinite loop).
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private Order order;

    /** The product ID from the product-service */
    @Column(nullable = false)
    private Long productId;

    /** How many units of this product */
    @Column(nullable = false)
    private Integer quantity;

    /** Price per unit at the time of purchase */
    @Column(nullable = false)
    private Double price;
}
