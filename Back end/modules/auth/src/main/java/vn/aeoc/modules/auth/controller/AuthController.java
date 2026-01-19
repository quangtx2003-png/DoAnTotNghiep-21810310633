package vn.aeoc.modules.auth.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

import vn.aeoc.modules.auth.request.ChangePasswordRequest;
import vn.aeoc.modules.auth.service.AuthService;
import vn.aeoc.packages.auth.rbac.annotation.IsUser;
import vn.aeoc.packages.auth.rbac.config.AppUserService;
import vn.aeoc.packages.auth.rbac.config.principal.impl.AppPrincipal;
import vn.aeoc.packages.auth.rbac.util.SecurityUtils;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.common.model.AuthResponse;
import vn.aeoc.packages.common.model.TokenResponse;
import vn.aeoc.packages.common.util.Mapper;
import vn.aeoc.packages.entity.api.User;

import java.security.Principal;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthController {

    private final AppUserService<User> userService;
    private final AuthService authService;

    @PostMapping("/authenticate/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody User user) {

        userService.register(user);

        return Mapper.map(new AuthResponse(true, "Đăng ký thành công"), ApiResponse::okEntity);
    }

    @PostMapping("/authenticate/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@RequestBody User loginRequest) {

        TokenResponse token = authService.authenticate(loginRequest, false);

        return Mapper.map(token, ApiResponse::okEntity);
    }

    @PostMapping("/me/change-password")
    public ResponseEntity<ApiResponse<String>> updatePassword(
            Principal principal,
            @RequestBody @Valid ChangePasswordRequest request) {

        Integer userId = SecurityUtils.userId(principal);

        authService.changePassword(userId, request);

        return ResponseEntity.ok(ApiResponse.ok("Đổi mật khẩu thành công"));
    }

    @GetMapping("/authenticate/me")
    @IsUser
    public ResponseEntity<ApiResponse<User>> me(AppPrincipal<User> principal) {

        Integer userId = Integer.valueOf(principal.getName());
        User user = userService.findById(userId);

        return Mapper.map(user, ApiResponse::okEntity);
    }
}
