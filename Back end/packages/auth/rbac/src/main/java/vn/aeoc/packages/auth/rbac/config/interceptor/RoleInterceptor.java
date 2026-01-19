package vn.aeoc.packages.auth.rbac.config.interceptor;

import java.io.IOException;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import vn.aeoc.packages.auth.rbac.annotation.IsAdmin;
import vn.aeoc.packages.auth.rbac.annotation.IsSeller;
import vn.aeoc.packages.auth.rbac.annotation.IsUser;
import vn.aeoc.packages.auth.rbac.config.AppUserService;
import vn.aeoc.packages.auth.rbac.config.principal.impl.AppAuthentication;
import vn.aeoc.packages.auth.rbac.config.principal.impl.AppPrincipal;
import vn.aeoc.packages.auth.rbac.model.AppUser;
import vn.aeoc.packages.auth.rbac.util.SecurityUtils;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.util.HttpResponseUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@Component
@AllArgsConstructor
public class RoleInterceptor<T extends AppUser> implements HandlerInterceptor {
    @Nullable
    private final AppUserService<T> userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        boolean needAdmin = handlerMethod.hasMethodAnnotation(IsAdmin.class);
        boolean needUser = handlerMethod.hasMethodAnnotation(IsUser.class);
        boolean needSeller = handlerMethod.hasMethodAnnotation(IsSeller.class);

        if (!needAdmin && !needUser && !needSeller) {
            return true;
        }

        AppPrincipal<T> principal = (AppPrincipal<T>) request.getUserPrincipal();
        AppAuthentication auth = (AppAuthentication) principal.getAuthentication();

        if (auth.isAdmin()) return true;
        if (auth.isSeller() && needSeller) return true;
        if ((auth.isUser() || auth.isSeller()) && needUser) return true;

        HttpResponseUtils.writeError(response, request, ErrorCode.FORBIDDEN);
        return false;
    }
}
