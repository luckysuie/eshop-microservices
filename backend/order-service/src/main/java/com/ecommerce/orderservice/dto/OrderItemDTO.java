package com.ecommerce.orderservice.dto;

import lombok.*;

/**
 * DTO for a single item in an order.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDTO {

    private Long id;
    private Long productId;
    private Integer quantity;
    private Double price;
}
