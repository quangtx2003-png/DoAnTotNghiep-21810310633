package vn.aeoc.modules.product.controlller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aeoc.modules.product.service.ProductWishlistService;
import vn.aeoc.packages.auth.rbac.annotation.IsUser;
import vn.aeoc.packages.auth.rbac.config.principal.impl.AppPrincipal;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductWishlist;
import vn.aeoc.packages.entity.api.User;

import java.security.Principal;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ProductWishlistController {

    private final ProductWishlistService service;

    @GetMapping("/wishlist/list")
    @IsUser
    public ResponseEntity<ApiResponse<Page<ProductWishlist>>> list(
            @RequestParam(name = "userId", required = false) Integer userId,
            @RequestParam(name = "productId", required = false) Integer productId,
            Pageable pageable) {

        var result = service.getByCriteria(userId, productId, pageable);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/wishlist")
    @IsUser
    public ResponseEntity<ApiResponse<?>> getByUser(
            AppPrincipal<User> user) {

        return ResponseEntity.ok(
                ApiResponse.ok(service.getByUserId(user.getId())));
    }

    @PostMapping("/wishlist/add")
    @IsUser
    public ResponseEntity<ApiResponse<String>> add(
            AppPrincipal<User> user,
            @RequestParam(name = "productId") Integer productId) {

        service.add(user.getId(), productId);
        return ResponseEntity.ok(
                ApiResponse.ok("Đã thêm sản phẩm vào yêu thích"));
    }

    @DeleteMapping("/wishlist/remove")
    @IsUser
    public ResponseEntity<ApiResponse<String>> delete(
            AppPrincipal<User> user,
            @RequestParam(name = "productId") Integer productId) {

        service.remove(user.getId(), productId);
        return ResponseEntity.ok(
                ApiResponse.ok("Đã xóa sản phẩm khỏi yêu thích"));
    }
}
