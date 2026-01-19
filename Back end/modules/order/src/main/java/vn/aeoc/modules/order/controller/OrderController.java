package vn.aeoc.modules.order.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aeoc.modules.order.constant.OrderStatus;
import vn.aeoc.modules.order.constant.PaymentStatus;
import vn.aeoc.modules.order.dto.request.OrderRequest;
import vn.aeoc.modules.order.dto.response.OrderResponse;
import vn.aeoc.modules.order.service.OrderService;
import vn.aeoc.packages.auth.rbac.annotation.IsAdmin;
import vn.aeoc.packages.auth.rbac.annotation.IsSeller;
import vn.aeoc.packages.auth.rbac.annotation.IsUser;
import vn.aeoc.packages.auth.rbac.util.SecurityUtils;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.model.ApiResponse;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.Order;

import java.security.Principal;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class OrderController {

    private final OrderService service;

    @GetMapping("/order/{id}")
    @IsUser
    public Order getById(
            @PathVariable(name = "id") Integer id) {

        return service.getById(id);
    }

    @GetMapping("/order/list")
    @IsUser
    public ResponseEntity<ApiResponse<Page<Order>>> list(
            @RequestParam(name = "userId", required = false) Integer userId,
            @RequestParam(name = "orderStatus", required = false) String orderStatus,
            @RequestParam(name = "paymentStatus", required = false) String paymentStatus,
            Pageable pageable) {

        var result =
                service.getByCriteria(userId, orderStatus, paymentStatus, pageable);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/order/detail/{id}")
    @IsUser
    public ResponseEntity<ApiResponse<OrderResponse>> getDetail(
            @PathVariable(name = "id") Integer id) {

        var result = service.getDetail(id);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @PostMapping("/order/create")
    @IsUser
    public ResponseEntity<ApiResponse<String>> create(
            Principal principal,
            @RequestBody OrderRequest o) {
        Integer loginId = SecurityUtils.userId(principal);
        o.setUserId(loginId);
        var result = service.create(o);
        return ResponseEntity.ok(ApiResponse.ok(result));

    }

    @PostMapping("/order/update-status")
    public ResponseEntity<ApiResponse<String>> updateStatus(
            Principal principal,
            @RequestBody OrderRequest o) {

        if (!OrderStatus.isValid(o.getStatus())) {
            throw new AppException(ErrorCode.INVALID_ORDER_STATUS);
        }

        if (!PaymentStatus.isValid(o.getPaymentStatus())) {
            throw new AppException(ErrorCode.INVALID_ORDER_STATUS);
        }
            service.updateStatus(o.getId(), o);
            return ResponseEntity.ok(ApiResponse.ok("Cập nhật trạng thái đơn đặt hàng thành công"));
    }
}
