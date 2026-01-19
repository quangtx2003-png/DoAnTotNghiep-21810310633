package vn.aeoc.modules.order.dto.request;
import lombok.Data;

@Data
public class OrderItemRequest {

    private Integer productVariantId;
    private Integer quantity;
}