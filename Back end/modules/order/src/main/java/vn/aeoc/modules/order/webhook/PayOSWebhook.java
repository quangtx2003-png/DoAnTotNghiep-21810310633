package vn.aeoc.modules.order.webhook;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.aeoc.modules.order.dto.request.PayOSWebhookRequest;
import vn.aeoc.modules.order.service.PayOSService;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class PayOSWebhook {

    private final PayOSService payOSService;

    @PostMapping("payos/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody PayOSWebhookRequest payload) {
        String response = payOSService.handleWebhook(payload);
        return ResponseEntity.ok(response);
    }
}
