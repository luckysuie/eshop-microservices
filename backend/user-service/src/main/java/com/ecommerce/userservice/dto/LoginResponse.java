package com.ecommerce.userservice.dto;

import lombok.*;

/**
 * Response body returned after a successful login.
 * Contains user info that the frontend needs (e.g. to display the user's name).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private Long id;
    private String name;
    private String email;
    private String role;
    private String message; // e.g. "Login successful"
}
