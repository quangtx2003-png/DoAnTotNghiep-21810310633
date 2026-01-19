package vn.aeoc.modules.product.controlller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aeoc.modules.product.service.CategoryService;
import vn.aeoc.packages.auth.rbac.annotation.IsSeller;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.Category;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService service;

    @GetMapping("/category/{id}")
    @IsSeller
    public Category getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @GetMapping("/category/list")
    @IsSeller
    public ResponseEntity<ApiResponse<Page<Category>>> list(
            @RequestParam(name = "keyword", required = false) String keyword,
            Pageable pageable) {

        var result = service.getByCriteria(keyword, pageable);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @PostMapping("/category/update")
    @IsSeller
    public ResponseEntity<ApiResponse<String>> upsert(
            @Valid @RequestBody Category category) {

        if (category.getId() != null) {
            service.update(category.getId(), category);
            return ResponseEntity.ok(ApiResponse.ok("Cập nhật category thành công"));
        } else {
            service.create(category);
            return ResponseEntity.ok(ApiResponse.ok("Tạo mới category thành công"));
        }
    }

    @DeleteMapping("/category/{id}")
    @IsSeller
    public ResponseEntity<ApiResponse<String>> delete(
            @PathVariable(name = "id") Integer id) {

        service.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa category thành công"));
    }
}
