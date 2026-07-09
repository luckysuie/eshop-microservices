package com.ecommerce.userservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * GlobalExceptionHandler - catches exceptions from all controllers
 * and returns consistent, readable error responses.
 *
 * @RestControllerAdvice makes this class apply to all @RestController classes.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles validation failures (e.g. missing required fields, invalid email).
     * Returns a map of field -> error message.
     *
     * Example response:
     * {
     *   "email": "Please provide a valid email address",
     *   "password": "Password must be at least 6 characters long"
     * }
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    /**
     * Handles business logic exceptions (e.g. "Email already registered").
     * Returns a JSON object with a "message" field.
     *
     * Example response:
     * { "message": "Email already registered: alice@example.com" }
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}
