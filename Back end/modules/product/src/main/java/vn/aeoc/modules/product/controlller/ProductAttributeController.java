package vn.aeoc.modules.product.controlller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aeoc.modules.product.service.ProductAttributeService;
import vn.aeoc.packages.auth.rbac.annotation.IsSeller;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductAttribute;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ProductAttributeController {

    private final ProductAttributeService service;

    @GetMapping("/productAttribute/{id}")
    @IsSeller
    public ProductAttribute getById(
            @PathVariable(name = "id") Integer id) {

        return service.getById(id);
    }

    @GetMapping("/productAttribute/list")
    @IsSeller
    public ResponseEntity<ApiResponse<Page<ProductAttribute>>> list(
            @RequestParam(name = "productId", required = false) Integer productId,
            @RequestParam(name = "keyword", required = false) String keyword,
            Pageable pageable) {

        var result = service.getByCriteria(productId, keyword, pageable);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/productAttribute/byProduct/{productId}")
    @IsSeller
    public ResponseEntity<ApiResponse<?>> getByProduct(
            @PathVariable(name = "productId") Integer productId) {

        return ResponseEntity.ok(
                ApiResponse.ok(service.getByProductId(productId)));
    }

    @PostMapping("/productAttribute/update")
    @IsSeller
    public ResponseEntity<ApiResponse<ProductAttribute>> upsert(
            @RequestBody ProductAttribute attr) {

        if (attr.getId() != null) {
            service.update(attr.getId(), attr);
            return ResponseEntity.ok(
                    ApiResponse.ok(service.getById(attr.getId())));
        } else {

            return ResponseEntity.ok(
                    ApiResponse.ok(service.create(attr)));
        }
    }

    @DeleteMapping("/productAttribute/{id}")
    @IsSeller
    public ResponseEntity<ApiResponse<String>> delete(
            @PathVariable(name = "id") Integer id) {

        service.delete(id);
        return ResponseEntity.ok(
                ApiResponse.ok("Xóa product attribute thành công"));
    }
}
