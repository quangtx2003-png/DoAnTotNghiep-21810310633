package vn.aeoc.packages.auth.rbac.config.principal.impl;

import java.security.Principal;
import java.util.Map;

import lombok.Builder;
import lombok.Data;

import vn.aeoc.packages.auth.rbac.config.principal.Authentication;

@Data
@Builder
public class AppPrincipal<T> implements Principal {

    private Authentication authentication;
    private T otherInfo;
    private Integer id;
    private Map<String, String> clientInfo;

    @Override
    public String getName() {
        return id != null ? id.toString() : null;
    }

    public boolean isAdmin() {
        return authentication != null && "admin".equalsIgnoreCase(authentication.getRole());
    }

    public boolean isUser() {
        return authentication != null && "user".equalsIgnoreCase(authentication.getRole());
    }
}
