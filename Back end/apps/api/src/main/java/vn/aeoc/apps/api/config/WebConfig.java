package vn.aeoc.apps.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.AllArgsConstructor;

import vn.aeoc.packages.auth.rbac.config.interceptor.RoleInterceptor;
import vn.aeoc.packages.entity.api.User;

@AllArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final RoleInterceptor<User> interceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(interceptor).addPathPatterns("/**");
    }
}
