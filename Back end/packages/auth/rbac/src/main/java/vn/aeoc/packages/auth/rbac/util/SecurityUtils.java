package vn.aeoc.packages.auth.rbac.util;

import java.security.Principal;

import vn.aeoc.packages.auth.rbac.config.principal.impl.AppPrincipal;
import vn.aeoc.packages.auth.rbac.model.AppUser;
import vn.aeoc.packages.auth.rbac.model.SecurityUser;

public class SecurityUtils {

    public static Integer userId(Principal principal) {
        if (principal == null) return 0;
        Object id = ((AppPrincipal) principal).getId();
        return id instanceof Integer ? (Integer) id : 0;
    }

    public static <T extends AppUser> SecurityUser<T> toSecurityUser(T user) {
        return new SecurityUser<>(user);
    }
}
