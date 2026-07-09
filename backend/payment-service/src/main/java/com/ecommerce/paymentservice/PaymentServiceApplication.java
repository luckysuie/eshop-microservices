package com.ecommerce.paymentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Payment Service microservice.
 *
 * Responsibilities:
 *  - Processing payments for orders
 *  - Recording payment transactions
 *  - Retrieving payment status
 *
 * NOTE: This is a demo implementation. In production, integrate with
 * a real payment gateway (Stripe, Razorpay, PayPal, etc.)
 *
 * Port: 8084
 */
@SpringBootApplication
public class PaymentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PaymentServiceApplication.class, args);
    }
}
