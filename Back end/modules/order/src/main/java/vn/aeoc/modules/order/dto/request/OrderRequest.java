package vn.aeoc.modules.order.dto.request;

import lombok.Data;
import vn.aeoc.packages.entity.api.Order;

import java.util.List;

@Data
public class OrderRequest extends Order {
    private String paymentReturnUrl;
    private List<OrderItemRequest> items;
}