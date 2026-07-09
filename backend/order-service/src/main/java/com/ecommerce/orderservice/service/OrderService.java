package com.ecommerce.orderservice.service;

import com.ecommerce.orderservice.dto.CreateOrderRequest;
import com.ecommerce.orderservice.dto.OrderDTO;

import java.util.List;

/**
 * OrderService interface - defines all order-related business operations.
 */
public interface OrderService {

    /** Place a new order */
    OrderDTO createOrder(CreateOrderRequest request);

    /** Get a single order by ID */
    OrderDTO getOrderById(Long id);

    /** Get all orders for a specific user */
    List<OrderDTO> getOrdersByUser(Long userId);

    /** Get all orders (admin) */
    List<OrderDTO> getAllOrders();

    /** Update order status (e.g. PENDING -> CONFIRMED) */
    OrderDTO updateOrderStatus(Long id, String status);

    /** Cancel/delete an order */
    void deleteOrder(Long id);
}
