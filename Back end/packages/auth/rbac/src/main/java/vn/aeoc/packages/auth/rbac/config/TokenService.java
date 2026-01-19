package vn.aeoc.packages.auth.rbac.config;

import java.util.function.Function;

import vn.aeoc.packages.auth.rbac.model.SecurityUser;

import io.jsonwebtoken.Claims;

public interface TokenService {

    String generate(SecurityUser<?> user);

    boolean validate(String token);

    boolean isExpired(String token);

    <T> T getClaim(String token, Function<Claims, T> resolver);

    SecurityUser<?> extractUser(String token);
}
