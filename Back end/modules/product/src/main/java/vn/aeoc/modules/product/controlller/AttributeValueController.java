package vn.aeoc.modules.product.controlller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aeoc.modules.product.service.AttributeValueService;
import vn.aeoc.packages.auth.rbac.annotation.IsSeller;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.AttributeValue;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AttributeValueController {

    private final AttributeValueService service;

    @GetMapping("/attributeValue/{id}")
    @IsSeller
    public AttributeValue getById(
            @PathVariable(name = "id") Integer id) {

        return service.getById(id);
    }

    @GetMapping("/attributeValue/list")
    @IsSeller
    public ResponseEntity<ApiResponse<Page<AttributeValue>>> list(
            @RequestParam(name = "attributeId", required = false) Integer attributeId,
            @RequestParam(name = "keyword", required = false) String keyword,
            Pageable pageable) {

        var result = service.getByCriteria(attributeId, keyword, pageable);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/attributeValue/byAttribute/{attributeId}")
    @IsSeller
    public ResponseEntity<ApiResponse<?>> getByAttribute(
            @PathVariable(name = "attributeId") Integer attributeId) {

        return ResponseEntity.ok(
                ApiResponse.ok(service.getByAttributeId(attributeId)));
    }

    @PostMapping("/attributeValue/update")
    @IsSeller
    public ResponseEntity<ApiResponse<AttributeValue>> upsert(
            @RequestBody AttributeValue val) {

        if (val.getId() != null) {
            service.update(val.getId(), val);
            return ResponseEntity.ok(
                    ApiResponse.ok(service.getById(val.getId())));
        } else {
            return ResponseEntity.ok(
                    ApiResponse.ok(service.create(val)));
        }
    }

    @DeleteMapping("/attributeValue/{id}")
    @IsSeller
    public ResponseEntity<ApiResponse<String>> delete(
            @PathVariable(name = "id") Integer id) {

        service.delete(id);
        return ResponseEntity.ok(
                ApiResponse.ok("Xóa attribute value thành công"));
    }
}
