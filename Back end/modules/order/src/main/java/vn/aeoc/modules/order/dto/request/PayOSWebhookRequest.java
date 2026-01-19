package vn.aeoc.modules.order.dto.request;

import lombok.Data;

@Data
public class PayOSWebhookRequest {
    private String code;
    private boolean success;
    private WebhookData data;
    private String signature;

    @Data
    public static class WebhookData {
        private Integer orderCode;
        private Integer amount;
        private String paymentLinkId;
        private String reference;
    }
}