package vn.aeoc.modules.ai.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.aeoc.modules.ai.dto.AiChatRequest;
import vn.aeoc.modules.ai.dto.AiIntentResult;
import vn.aeoc.modules.ai.service.GeminiService;
import vn.aeoc.modules.product.repository.ProductRepository;
import vn.aeoc.modules.product.dto.request.ProductListRequest;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AiProductController {

    private final GeminiService geminiService;
    private final ProductRepository productRepository;

    @PostMapping("/ai/search")
    public ResponseEntity<?> search(@RequestBody AiChatRequest request) throws Exception {

        AiIntentResult ai = geminiService.analyzeIntent(request.getMessage());

        if (!"SEARCH_PRODUCT".equalsIgnoreCase(ai.getIntent())) {
            return ResponseEntity.ok(
                    Map.of(
                            "type", "CHAT",
                            "message", geminiService.chat(request.getMessage())
                    )
            );
        }

        ProductListRequest req = new ProductListRequest();
        if (ai.getKeywords() != null) {
            req.setKeyword(String.join(" ", ai.getKeywords()));
        }
        req.setCategoryId(ai.getCategoryId());
        req.setPriceFrom(ai.getPriceFrom());
        req.setPriceTo(ai.getPriceTo());
        req.setSortBy(ai.getSortBy());
        req.setSortDir(ai.getSortDir());
        req.setActive(1);

        Pageable pageable = new Pageable();
        pageable.setPage(1);
        pageable.setLimit(ai.getLimit() != null ? ai.getLimit() : 10);

        List<Product> products =
                productRepository.getByCriteria(req, pageable);

        if (products.isEmpty()) {
            return ResponseEntity.ok(
                    Map.of(
                            "type", "NO_RESULT",
                            "message", "Không tìm thấy sản phẩm phù hợp."
                    )
            );
        }

        /* 3️⃣ AI chọn sản phẩm phù hợp nhất */
        Product best =
                geminiService.pickBestProduct(request.getMessage(), products);

        return ResponseEntity.ok(
                Map.of(
                        "type", "PRODUCT",
                        "data", best
                )
        );
    }
}
