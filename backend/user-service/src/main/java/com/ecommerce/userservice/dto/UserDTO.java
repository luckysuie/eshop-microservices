package com.ecommerce.userservice.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * UserDTO - the data we send back to clients.
 *
 * Important: We do NOT include the password field here.
 * Never send passwords back to the client!
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private String role;
    private LocalDateTime createdAt;
}
