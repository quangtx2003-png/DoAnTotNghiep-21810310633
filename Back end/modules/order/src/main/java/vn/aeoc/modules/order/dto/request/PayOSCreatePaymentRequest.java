package vn.aeoc.modules.order.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayOSCreatePaymentRequest {
    private Integer orderCode;
    private Integer amount;
    private String description;
    private String cancelUrl;
    private String returnUrl;
    private String signature;
}
