package com.ecommerce.productservice.service;

import com.ecommerce.productservice.dto.CreateProductRequest;
import com.ecommerce.productservice.dto.ProductDTO;

import java.util.List;

/**
 * ProductService interface - defines all product-related business operations.
 */
public interface ProductService {

    /** Add a new product to the catalog */
    ProductDTO createProduct(CreateProductRequest request);

    /** Get a single product by ID */
    ProductDTO getProductById(Long id);

    /** Get all products */
    List<ProductDTO> getAllProducts();

    /** Search products by name (partial match) */
    List<ProductDTO> searchByName(String name);

    /** Get products filtered by category */
    List<ProductDTO> getByCategory(String category);

    /** Update an existing product */
    ProductDTO updateProduct(Long id, CreateProductRequest request);

    /** Remove a product from the catalog */
    void deleteProduct(Long id);
}
