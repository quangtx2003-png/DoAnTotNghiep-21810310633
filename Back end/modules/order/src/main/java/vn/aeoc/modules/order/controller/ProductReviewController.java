package vn.aeoc.modules.order.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aeoc.modules.order.service.ProductReviewService;
import vn.aeoc.packages.auth.rbac.annotation.IsUser;
import vn.aeoc.packages.auth.rbac.util.SecurityUtils;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductReview;

import java.security.Principal;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ProductReviewController {

    private final ProductReviewService service;

    @GetMapping("/productReview/list")
    public ResponseEntity<ApiResponse<Page<ProductReview>>> list(
            @RequestParam(name = "productId", required = false) Integer productId,
            @RequestParam(name = "productVariantId", required = false) Integer productVariantId,
            @RequestParam(name = "userId", required = false) Integer userId,
            @RequestParam(name = "rating", required = false) Integer rating,
            Pageable pageable) {

        var result = service.getByCriteria(productId, productVariantId, userId, rating, pageable);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @PostMapping("/productReview/update")
    @IsUser
    public ResponseEntity<ApiResponse<ProductReview>> create(@RequestBody ProductReview review,
                                                             Principal principal) {
        Integer userId = SecurityUtils.userId(principal);
        review.setUserId(userId);
        return ResponseEntity.ok(ApiResponse.ok(service.create(review)));
    }

    @DeleteMapping("/productReview/{id}")
    @IsUser
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable Integer id,
                                                      Principal principal) {
        Integer userId = SecurityUtils.userId(principal);
        return ResponseEntity.ok(ApiResponse.ok(service.delete(id, userId)));
    }
}
