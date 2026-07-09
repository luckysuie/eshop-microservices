package com.ecommerce.productservice.repository;

import com.ecommerce.productservice.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ProductRepository - database operations for products.
 *
 * Spring Data auto-generates implementations for these methods based on the method names.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Search products by name (partial, case-insensitive match).
     * e.g. searchByName("lap") will find "Laptop", "Laptop Stand", etc.
     */
    List<Product> findByNameContainingIgnoreCase(String name);

    /**
     * Get all products in a specific category.
     */
    List<Product> findByCategory(String category);
}
