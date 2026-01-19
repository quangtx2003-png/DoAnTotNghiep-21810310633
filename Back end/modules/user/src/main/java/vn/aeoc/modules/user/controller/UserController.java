package vn.aeoc.modules.user.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;
import vn.aeoc.modules.user.service.UserService;
import vn.aeoc.packages.auth.rbac.annotation.IsAdmin;
import vn.aeoc.packages.auth.rbac.annotation.IsUser;
import vn.aeoc.packages.auth.rbac.util.SecurityUtils;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.User;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user/{id}")
    @IsUser
    public User getById(@PathVariable("id") Integer id) {
        return userService.findById(id);
    }

    @GetMapping("/user/list")
    @IsAdmin
    public ResponseEntity<ApiResponse<Page<User>>> list(
            @RequestParam(name = "keyword", required = false) String keyword,
            Pageable pageable) {
        var result = userService.getByCriteria(keyword, pageable);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    /**
     * Cập nhật thông tin cơ bản của người dùng hiện tại
     */
    @PostMapping("/me/update")
    @IsUser
    public ResponseEntity<ApiResponse<String>> updateInfo(
            Principal principal,
            @RequestBody User user) {
        Integer id = SecurityUtils.userId(principal);
        userService.updateBasicInfo(id, user);

        return ResponseEntity.ok(ApiResponse.ok("Câp nhật thông tin thành công"));
    }

    @DeleteMapping("/user/{id}")
    @IsAdmin
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable("id") Integer id) {
        userService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa người dùng thành công"));
    }

    /**
     * Cập nhật trạng thái kích hoạt của người dùng
     */
    @PostMapping("/user/{id}/active")
    public ResponseEntity<ApiResponse<String>> active(
            @PathVariable("id") Integer id,
            @RequestParam(name = "active", defaultValue = "true") boolean active) {
        userService.setActive(id, active);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật trạng thái thành công"));
    }
}