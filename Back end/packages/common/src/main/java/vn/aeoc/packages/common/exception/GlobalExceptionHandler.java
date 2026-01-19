package vn.aeoc.packages.common.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.validation.FieldError;
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<Map<String, Object>> handleAppException(
                                                                  AppException ex, HttpServletRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("path", request.getRequestURI());
        body.put("message", ex.getMessage());
        body.put("code", ex.getStatusCode());
        return ResponseEntity.status(ex.getStatusCode()).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleException(Exception ex, HttpServletRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("path", request.getRequestURI());
        body.put("message", "Lỗi hệ thống: " + ex.getMessage());
        body.put("code", 500);
        return ResponseEntity.status(500).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {

        String error = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .findFirst()
                .orElse("Đầu vào sai");

        Map<String, Object> body = new HashMap<>();
        body.put("path", request.getRequestURI());
        body.put("code", 400);
        body.put("error", error);

        return ResponseEntity.badRequest().body(body);
    }
}
