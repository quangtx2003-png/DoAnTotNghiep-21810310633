package vn.aeoc.packages.auth.rbac.config.filter;

import java.io.IOException;
import java.security.Principal;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.AllArgsConstructor;

import vn.aeoc.packages.auth.rbac.config.TokenService;
import vn.aeoc.packages.auth.rbac.config.resolver.PrincipalResolver;
import vn.aeoc.packages.auth.rbac.config.web.PrincipalRequestWrapper;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.util.HttpResponseUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenService jwtService;
    private final PrincipalResolver principalResolver;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = extractTokenFromRequest(request);

        try {
            if (token != null) {
                if (jwtService.isExpired(token)) {
                    HttpResponseUtils.writeError(response, request, ErrorCode.TOKEN_EXPIRED);
                    return;
                }

                Principal principal = principalResolver.resolve(token, request);
                if (principal != null) {
                    request = new PrincipalRequestWrapper(request, principal);
                }
            }

            filterChain.doFilter(request, response);

        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            HttpResponseUtils.writeError(response, request, ErrorCode.TOKEN_EXPIRED);
            return;
        } catch (io.jsonwebtoken.JwtException | IllegalArgumentException e) {
            HttpResponseUtils.writeError(response, request, ErrorCode.UNAUTHORIZED);
            return;
        } catch (AppException e) {
            HttpResponseUtils.writeError(response, request, e.getStatusCode(), e.getMessage());
            return;
        }
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
