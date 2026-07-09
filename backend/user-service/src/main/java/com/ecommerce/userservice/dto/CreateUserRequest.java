package com.ecommerce.userservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Request body for POST /api/users/register
 *
 * Validation annotations ensure we get clean data before processing.
 */
@Data
public class CreateUserRequest {

    /** Full name of the user */
    @NotBlank(message = "Name is required")
    private String name;

    /** Must be a valid email format */
    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    /** Minimum 6 characters */
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;
}
