package com.ecommerce.productservice.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * ProductDTO - returned in API responses.
 * Contains all product fields (products have no sensitive data).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String category;
    private LocalDateTime createdAt;
}
