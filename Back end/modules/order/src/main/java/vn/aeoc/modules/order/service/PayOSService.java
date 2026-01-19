package vn.aeoc.modules.order.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import vn.aeoc.modules.order.config.PayOSConfig;
import vn.aeoc.modules.order.constant.OrderStatus;
import vn.aeoc.modules.order.constant.PaymentStatus;
import vn.aeoc.modules.order.dto.request.PayOSCreatePaymentRequest;
import vn.aeoc.modules.order.dto.request.PayOSWebhookRequest;
import vn.aeoc.modules.order.dto.response.PayOSCreatePaymentResponse;
import vn.aeoc.modules.order.repository.OrderRepository;
import vn.aeoc.packages.entity.api.Order;

import static vn.aeoc.packages.common.util.CommonUtils.hmacSHA256;

@Service
@Slf4j
@RequiredArgsConstructor
public class PayOSService {

    private final PayOSConfig payOSConfig;
    private final RestTemplate restTemplate = new RestTemplate();
    private final OrderRepository orderRepository;

    public String createPayOSOrder(Integer orderId, Double amount) {
        String rawData = String.format(
                "amount=%d&cancelUrl=%s&description=%s&orderCode=%d&returnUrl=%s",
                amount.intValue(),
                payOSConfig.getCancelUrl(),
                payOSConfig.getDescription(),
                orderId,
                payOSConfig.getReturnUrl()
        );

        String signature = hmacSHA256(rawData, payOSConfig.getChecksumKey());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-client-id", payOSConfig.getClientId());
        headers.set("x-api-key", payOSConfig.getApiKey());

        PayOSCreatePaymentRequest request = new PayOSCreatePaymentRequest();
        request.setOrderCode(orderId);
        request.setAmount(amount.intValue());
        request.setDescription(payOSConfig.getDescription());
        request.setReturnUrl(payOSConfig.getReturnUrl());
        request.setCancelUrl(payOSConfig.getCancelUrl());
        request.setSignature(signature);

        HttpEntity<PayOSCreatePaymentRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<PayOSCreatePaymentResponse> response = restTemplate.postForEntity(
                payOSConfig.getBaseUrl() + "/v2/payment-requests",
                entity,
                PayOSCreatePaymentResponse.class
        );

        assert response.getBody() != null;
        return response.getBody().getData().getCheckoutUrl();
    }

    @Transactional
    public String handleWebhook(PayOSWebhookRequest req) {
        String rawData = String.format(
                "amount=%d&cancelUrl=%s&description=%s&orderCode=%d&returnUrl=%s",
                req.getData().getAmount(),
                payOSConfig.getCancelUrl(),
                payOSConfig.getDescription(),
                req.getData().getOrderCode(),
                payOSConfig.getReturnUrl()
        );

//        TODO: tạm thời bỏ kiểm tra chữ ký
//        String expectedSignature = hmacSHA256(rawData, payOSConfig.getChecksumKey());
//
//        if (!expectedSignature.equals(req.getSignature())) {
//            log.error("INVALID PAYOS SIGNATURE");
//            return "INVALID SIGNATURE";
//        }

        if (!"00".equals(req.getCode()) || !req.isSuccess()) {
            log.warn("Webhook not success");
            return "IGNORED";
        }

        Integer orderId = req.getData().getOrderCode();

        Order order = orderRepository.getById(orderId);

        if (order == null) {
            log.error("Order not found: {}", orderId);
            return "ORDER NOT FOUND";
        }

        order.setPaymentStatus(PaymentStatus.PAID);
        order.setStatus(OrderStatus.CONFIRMED);
        orderRepository.update(order.getId(), order);

        return "SUCCESS";
    }
}
