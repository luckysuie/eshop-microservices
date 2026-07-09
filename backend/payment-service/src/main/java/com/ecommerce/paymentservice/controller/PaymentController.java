package com.ecommerce.paymentservice.controller;

import com.ecommerce.paymentservice.dto.PaymentDTO;
import com.ecommerce.paymentservice.dto.ProcessPaymentRequest;
import com.ecommerce.paymentservice.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * PaymentController - REST API for payment operations.
 *
 * Base path: /api/payments
 */
@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    /**
     * POST /api/payments
     * Process a payment for an order.
     * Called by the frontend during checkout.
     */
    @PostMapping
    public ResponseEntity<PaymentDTO> processPayment(
            @Valid @RequestBody ProcessPaymentRequest request) {
        PaymentDTO payment = paymentService.processPayment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(payment);
    }

    /**
     * GET /api/payments
     * Get all payment records (admin).
     */
    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAll() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    /**
     * GET /api/payments/{id}
     * Get a specific payment by its ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }

    /**
     * GET /api/payments/order/{orderId}
     * Get the payment for a specific order.
     * Useful for checking if an order was paid.
     */
    @GetMapping("/order/{orderId}")
    public ResponseEntity<PaymentDTO> getByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.getPaymentByOrderId(orderId));
    }

    /**
     * PUT /api/payments/{id}/status?status=REFUNDED
     * Update payment status (e.g. for refunds).
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<PaymentDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(paymentService.updatePaymentStatus(id, status));
    }
}
