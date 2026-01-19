// package vn.aeoc.packages.auth.rbac.config.web;
//
// import lombok.AllArgsConstructor;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
// import vn.aeoc.packages.auth.rbac.config.interceptor.RoleInterceptor;
//
// @Configuration
// @AllArgsConstructor
// public class WebConfig implements WebMvcConfigurer {
//
//    private final RoleInterceptor roleInterceptor;
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(roleInterceptor)
//                .addPathPatterns("/**");
//    }
// }
