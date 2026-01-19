package vn.aeoc.packages.common.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    Boolean success;
    String message;
}
