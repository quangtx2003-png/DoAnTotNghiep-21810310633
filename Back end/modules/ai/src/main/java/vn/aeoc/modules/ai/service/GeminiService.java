package vn.aeoc.modules.ai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import vn.aeoc.modules.ai.dto.AiIntentResult;
import vn.aeoc.packages.entity.api.Product;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${gemini.api-key}")
    private String apiKey;

    @Value("${gemini.model}")
    private String model;

    @Value("${gemini.url}")
    private String baseUrl;

    @Value("${gemini.temperature}")
    private Double temperature;

    /* =========================
     * PROMPTS
     * ========================= */

    private static final String INTENT_PROMPT = """
Bạn là AI tư vấn bán hàng cho website thương mại điện tử.

NHIỆM VỤ:
- Xác định người dùng đang CHAT hay MUỐN TÌM SẢN PHẨM.
- Nếu chat bình thường → intent = CHAT
- Nếu tìm sản phẩm → intent = SEARCH_PRODUCT

CHỈ TRẢ JSON THUẦN, KHÔNG DÙNG ```json, KHÔNG GIẢI THÍCH.

{
  "intent": "CHAT" | "SEARCH_PRODUCT",
  "keywords": string[] | null,
  "categoryId": number | null,
  "priceFrom": number | null,
  "priceTo": number | null,
  "sortBy": "minPrice" | "maxPrice" | "avgRating" | null,
  "sortDir": "asc" | "desc" | null,
  "limit": number | null
}
""";

    private static final String PICK_PRODUCT_PROMPT = """
Người dùng nói:
"%s"

Danh sách sản phẩm (JSON):
%s

Hãy chọn 1 sản phẩm phù hợp nhất.
CHỈ TRẢ VỀ ID (SỐ).
""";

    /* =========================
     * PUBLIC METHODS
     * ========================= */

    public AiIntentResult analyzeIntent(String message) throws Exception {

        String raw = callGemini(INTENT_PROMPT + "\nUser: " + message);
        String json = cleanJson(raw);

        log.debug("Gemini intent raw: {}", raw);
        log.debug("Gemini intent json: {}", json);

        return objectMapper.readValue(json, AiIntentResult.class);
    }

    public String chat(String message) {
        String raw = callGemini(message);
        return stripMarkdown(raw);
    }

    public Product pickBestProduct(String userMessage, List<Product> products) throws Exception {

        String prompt = PICK_PRODUCT_PROMPT.formatted(
                userMessage,
                objectMapper.writeValueAsString(products)
        );

        String raw = callGemini(prompt);
        String idText = raw.replaceAll("[^0-9]", "");

        if (idText.isBlank()) {
            log.warn("Gemini did not return product id, fallback to first product");
            return products.get(0);
        }

        Integer productId = Integer.valueOf(idText);

        return products.stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElse(products.get(0));
    }

    /* =========================
     * CORE GEMINI CALL
     * ========================= */

    private String callGemini(String text) {

        String url = baseUrl + "/" + model + ":generateContent";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-goog-api-key", apiKey);

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", text)
                                )
                        )
                ),
                "generationConfig", Map.of(
                        "temperature", temperature
                )
        );

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(url, entity, Map.class);

        return extractText(response.getBody());
    }

    /* =========================
     * RESPONSE PARSING
     * ========================= */

    @SuppressWarnings("unchecked")
    private String extractText(Map body) {

        if (body == null) {
            throw new RuntimeException("Gemini response body is null");
        }

        List<Map> candidates = (List<Map>) body.get("candidates");
        if (candidates == null || candidates.isEmpty()) {
            throw new RuntimeException("Gemini response missing candidates");
        }

        Map content = (Map) candidates.get(0).get("content");
        List<Map> parts = (List<Map>) content.get("parts");

        if (parts == null || parts.isEmpty()) {
            throw new RuntimeException("Gemini response missing parts");
        }

        return parts.get(0).get("text").toString();
    }

    /* =========================
     * JSON / MARKDOWN CLEANERS
     * ========================= */

    private String cleanJson(String text) {

        if (text == null) return null;

        String cleaned = text.trim();

        // remove ```json ... ```
        if (cleaned.startsWith("```")) {
            cleaned = cleaned
                    .replaceAll("(?s)```json", "")
                    .replaceAll("(?s)```", "")
                    .trim();
        }

        // remove backticks đơn lẻ
        cleaned = cleaned.replaceAll("^`+", "")
                .replaceAll("`+$", "")
                .trim();

        return cleaned;
    }

    private String stripMarkdown(String text) {
        if (text == null) return null;
        return text.replaceAll("```.*?```", "")
                .replaceAll("`", "")
                .trim();
    }
}
