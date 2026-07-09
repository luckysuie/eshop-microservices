package com.ecommerce.orderservice.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for an order - includes all order details and the list of items.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    private Long id;
    private Long userId;
    private Double totalAmount;
    private String status;
    private LocalDateTime createdAt;
    private List<OrderItemDTO> items;
}
