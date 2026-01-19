package vn.aeoc.modules.order.dto.response;

import lombok.Data;

@Data
public class PayOSCreatePaymentResponse {

    private String code;
    private String desc;
    private DataResponse data;
    private String signature;

    @Data
    public static class DataResponse {
        private String bin;
        private String accountNumber;
        private String accountName;
        private Integer amount;
        private String description;
        private Integer orderCode;
        private String currency;
        private String paymentLinkId;
        private String status;
        private String checkoutUrl;
        private String qrCode;
    }
}