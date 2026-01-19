package vn.aeoc.modules.order.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aeoc.modules.order.service.OrderItemService;
import vn.aeoc.packages.auth.rbac.annotation.IsUser;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.entity.api.OrderItem;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class OrderItemController {

    private final OrderItemService service;

    @PostMapping("/orderItem/update")
    @IsUser
    public ResponseEntity<ApiResponse<OrderItem>> create(
            @RequestParam(name = "orderId") Integer orderId,
            @RequestParam(name = "productVariantId") Integer productVariantId,
            @RequestParam(name = "quantity") Integer quantity) {

        OrderItem item =
                service.create(orderId, productVariantId, quantity);

        return ResponseEntity.ok(ApiResponse.ok(item));
    }
}
