package com.ecommerce.productservice;

import com.ecommerce.productservice.entity.Product;
import com.ecommerce.productservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * DataInitializer - seeds the products table with sample data on first startup.
 * Only inserts products if the table is empty, so it never duplicates data.
 */
@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedProducts(ProductRepository repo) {
        return args -> {
            if (repo.count() > 0) {
                return; // already seeded — do nothing
            }

            List<Product> products = List.of(
                Product.builder()
                    .name("Wireless Noise-Cancelling Headphones")
                    .description("Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound. Perfect for travel and work-from-home.")
                    .price(149.99)
                    .stock(45)
                    .category("Electronics")
                    .build(),

                Product.builder()
                    .name("Mechanical Gaming Keyboard")
                    .description("RGB backlit mechanical keyboard with Cherry MX switches, anti-ghosting, and programmable macro keys. Built for serious gamers.")
                    .price(89.99)
                    .stock(30)
                    .category("Electronics")
                    .build(),

                Product.builder()
                    .name("4K Ultra HD Smart TV 55\"")
                    .description("55-inch 4K UHD Smart TV with HDR10, Dolby Vision, built-in streaming apps, and voice control. Stunning picture quality for movies and gaming.")
                    .price(599.99)
                    .stock(12)
                    .category("Electronics")
                    .build(),

                Product.builder()
                    .name("Laptop Backpack Pro")
                    .description("Waterproof laptop backpack with USB charging port, anti-theft design, and padded compartments. Fits laptops up to 17 inches.")
                    .price(49.99)
                    .stock(80)
                    .category("Accessories")
                    .build(),

                Product.builder()
                    .name("Running Shoes - AirFlex")
                    .description("Lightweight breathable running shoes with responsive foam cushioning and durable rubber outsole. Available in multiple sizes.")
                    .price(79.99)
                    .stock(55)
                    .category("Clothing")
                    .build(),

                Product.builder()
                    .name("Stainless Steel Water Bottle")
                    .description("Double-walled insulated stainless steel bottle that keeps drinks cold for 24 hours and hot for 12 hours. BPA-free, 1-litre capacity.")
                    .price(24.99)
                    .stock(150)
                    .category("Accessories")
                    .build(),

                Product.builder()
                    .name("The Complete Cloud Developer")
                    .description("Comprehensive guide to building and deploying cloud-native applications on AWS, Azure, and GCP. Covers microservices, containers, and CI/CD pipelines.")
                    .price(39.99)
                    .stock(60)
                    .category("Books")
                    .build(),

                Product.builder()
                    .name("Smart Fitness Band")
                    .description("Track steps, heart rate, sleep quality, and blood oxygen levels. 7-day battery, waterproof, compatible with iOS and Android.")
                    .price(59.99)
                    .stock(70)
                    .category("Electronics")
                    .build(),

                Product.builder()
                    .name("Ergonomic Office Chair")
                    .description("Adjustable lumbar support, breathable mesh back, and 360° swivel. Designed for long work sessions to reduce back pain and improve posture.")
                    .price(249.99)
                    .stock(18)
                    .category("Furniture")
                    .build(),

                Product.builder()
                    .name("Portable Bluetooth Speaker")
                    .description("360° surround sound, IPX7 waterproof, 20-hour playtime. Compact design perfect for outdoor adventures and beach trips.")
                    .price(69.99)
                    .stock(40)
                    .category("Electronics")
                    .build(),

                Product.builder()
                    .name("Men's Slim-Fit Chinos")
                    .description("Classic slim-fit chino trousers made from stretch cotton blend. Wrinkle-resistant, available in navy, khaki, and olive.")
                    .price(44.99)
                    .stock(95)
                    .category("Clothing")
                    .build(),

                Product.builder()
                    .name("Professional Chef's Knife Set")
                    .description("5-piece German stainless steel knife set with full tang construction. Includes chef, bread, carving, utility, and paring knives with a wooden block.")
                    .price(119.99)
                    .stock(25)
                    .category("Kitchen")
                    .build()
            );

            repo.saveAll(products);
            System.out.println("✅ DataInitializer: seeded " + products.size() + " sample products.");
        };
    }
}
