package com.ecommerce.paymentservice.service;

import com.ecommerce.paymentservice.dto.PaymentDTO;
import com.ecommerce.paymentservice.dto.ProcessPaymentRequest;

import java.util.List;

/**
 * PaymentService interface - defines all payment operations.
 */
public interface PaymentService {

    /** Process a payment for an order */
    PaymentDTO processPayment(ProcessPaymentRequest request);

    /** Get payment details by payment ID */
    PaymentDTO getPaymentById(Long id);

    /** Get payment for a specific order */
    PaymentDTO getPaymentByOrderId(Long orderId);

    /** Get all payments (admin) */
    List<PaymentDTO> getAllPayments();

    /** Update payment status (e.g. for refunds) */
    PaymentDTO updatePaymentStatus(Long id, String status);
}
