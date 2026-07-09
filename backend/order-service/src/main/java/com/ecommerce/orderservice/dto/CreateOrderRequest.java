package com.ecommerce.orderservice.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.List;

/**
 * Request body for POST /api/orders
 * Contains the user, total, and the list of items being ordered.
 */
@Data
public class CreateOrderRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Total amount is required")
    @Positive(message = "Total amount must be greater than zero")
    private Double totalAmount;

    @NotEmpty(message = "Order must contain at least one item")
    private List<CreateOrderItemRequest> items;
}
