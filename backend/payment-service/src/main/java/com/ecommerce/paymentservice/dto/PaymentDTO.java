package com.ecommerce.paymentservice.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * PaymentDTO - returned in API responses.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDTO {

    private Long id;
    private Long orderId;
    private Double amount;
    private String paymentMethod;
    private String status;
    private String transactionId;
    private LocalDateTime createdAt;
}
