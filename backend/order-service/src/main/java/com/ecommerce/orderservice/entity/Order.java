package com.ecommerce.orderservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Order entity - represents a customer's purchase.
 *
 * An Order has many OrderItems (one-to-many relationship).
 * CascadeType.ALL means saving/deleting an Order also saves/deletes its items.
 */
@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The ID of the user who placed this order */
    @Column(nullable = false)
    private Long userId;

    /** Total price of all items combined */
    @Column(nullable = false)
    private Double totalAmount;

    /**
     * Order lifecycle:
     * PENDING → CONFIRMED → SHIPPED → DELIVERED
     * Can also be: CANCELLED
     */
    @Column(nullable = false)
    @Builder.Default
    private String status = "PENDING";

    /** When the order was placed */
    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * The items in this order.
     * mappedBy = "order" points to the 'order' field in OrderItem.
     * FetchType.EAGER loads items immediately when the order is fetched.
     */
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();
}
