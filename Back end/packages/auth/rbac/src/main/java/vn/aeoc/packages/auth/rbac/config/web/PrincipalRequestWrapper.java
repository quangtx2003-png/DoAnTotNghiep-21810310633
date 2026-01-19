package vn.aeoc.packages.auth.rbac.config.web;

import java.security.Principal;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

public class PrincipalRequestWrapper extends HttpServletRequestWrapper {

    private final Principal principal;

    public PrincipalRequestWrapper(HttpServletRequest request, Principal principal) {
        super(request);
        this.principal = principal;
    }

    @Override
    public Principal getUserPrincipal() {
        return this.principal;
    }
}
