package vn.aeoc.modules.product.controlller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

import vn.aeoc.modules.product.dto.request.ProductListRequest;
import vn.aeoc.modules.product.dto.response.ProductDetailResponse;
import vn.aeoc.modules.product.service.ProductService;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.Product;

import static vn.aeoc.packages.common.util.CommonUtils.formatArrayListToJson;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/product/detail/{id}")
    public ResponseEntity<ApiResponse<ProductDetailResponse>> getDetail(
            @PathVariable(name = "id") Integer id) {

        var result = productService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/product/list")
    public ResponseEntity<ApiResponse<Page<Product>>> getByCriteria(
                                                                    @ModelAttribute ProductListRequest request, Pageable pageable) {

        Page<Product> result = productService.getByCriteria(request, pageable);

        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/product/list-detail")
    public ResponseEntity<ApiResponse<Page<ProductDetailResponse>>> getDetailByCriteria(
                                                                                        @ModelAttribute ProductListRequest request, Pageable pageable) {

        Page<ProductDetailResponse> result = productService.getProductDetailList(request, pageable);

        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @PostMapping("/product/update")
    public ResponseEntity<ApiResponse<Product>> upsert(@RequestBody Product product) {
        Product result;
//        product.setImage(formatArrayListToJson(product.getImage()));
        if (product.getId() == null) {
            result = productService.insert(product);
        } else {
            result = productService.update(product);
        }
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @PostMapping("/product/createWithStaticAttributes")
    public ResponseEntity<ApiResponse<Product>> createWithStaticAttributes(@RequestBody Product product) {
        Product result = productService.createWithStaticAttributes(product);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<ApiResponse<Integer>> delete(@PathVariable("id") Integer id) {
        Integer result = productService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }
}
