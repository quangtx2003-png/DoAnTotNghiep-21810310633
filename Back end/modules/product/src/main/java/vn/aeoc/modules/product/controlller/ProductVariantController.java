package vn.aeoc.modules.product.controlller;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aeoc.modules.product.dto.request.ProductVariantRequest;
import vn.aeoc.modules.product.dto.response.ProductVariantResponse;
import vn.aeoc.modules.product.service.ProductVariantService;
import vn.aeoc.packages.auth.rbac.annotation.IsAdmin;
import vn.aeoc.packages.auth.rbac.annotation.IsSeller;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductVariant;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ProductVariantController {

    private final ProductVariantService service;

    @GetMapping("/productVariant/{id}")
    public ProductVariant getById(@PathVariable(name = "id") Integer id) {
        return service.getById(id);
    }

    @GetMapping("/productVariant/list")
    public ResponseEntity<ApiResponse<Page<ProductVariant>>> list(
            @RequestParam(required = false) Integer productId,
            @RequestParam(required = false) String keyword,
            Pageable pageable) {

        var result = service.getByCriteria(productId, keyword, pageable);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/productVariant/byProduct/{productId}")
    public ResponseEntity<ApiResponse<?>> getByProduct(
            @PathVariable(name = "productId") Integer productId) {

        return ResponseEntity.ok(ApiResponse.ok(service.getByProductId(productId)));
    }

    @GetMapping("/productVariant/detail/{id}")
    public ResponseEntity<ApiResponse<ProductVariantResponse>> getDetail(
            @PathVariable(name = "id") Integer id) {

        var result = service.getDetail(id);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/productVariant/detailByIds")
    public ResponseEntity<ApiResponse<List<ProductVariantResponse>>> getLstDetail(
            @ModelAttribute(name = "ids") List<Integer> ids) {

        var result = service.getDetailByIds(ids);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @PostMapping("/productVariant/update")
    public ResponseEntity<ApiResponse<ProductVariant>> upsert(
            @RequestBody ProductVariantRequest variant) {

        if (variant.getId() != null) {
            service.update(variant.getId(), variant);
            return ResponseEntity.ok(ApiResponse.ok(service.getById(variant.getId())));
        } else {
            return ResponseEntity.ok(ApiResponse.ok(service.create(variant)));
        }
    }

    @DeleteMapping("/productVariant/{id}")
    @IsSeller
    public ResponseEntity<ApiResponse<String>> delete(
            @PathVariable("id") Integer id) {

        service.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa product variant thành công"));
    }
}
