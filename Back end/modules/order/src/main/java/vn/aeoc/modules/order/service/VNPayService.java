package vn.aeoc.modules.order.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.aeoc.modules.order.config.VNPayConfig;
import vn.aeoc.modules.order.constant.OrderStatus;
import vn.aeoc.packages.entity.api.Order;


import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@AllArgsConstructor
public class VNPayService {
    private final OrderService orderService;



    public void orderReturn(HttpServletRequest request) {

        Map<String, String> fields = new HashMap<>();

        for (Enumeration<String> params = request.getParameterNames(); params.hasMoreElements();) {
            String fieldName = params.nextElement();
            String fieldValue = request.getParameter(fieldName);
            if (fieldValue != null && !fieldValue.isEmpty()) {
                fields.put(fieldName, fieldValue);
            }
        }

        String secureHash = request.getParameter("vnp_SecureHash");
        fields.remove("vnp_SecureHash");
        fields.remove("vnp_SecureHashType");

        String signValue = VNPayConfig.hashAllFields(fields);

//        boolean validSign = signValue.equals(secureHash);
        boolean success = "00".equals(request.getParameter("vnp_TransactionStatus"));

        Long orderId = Long.valueOf(request.getParameter("vnp_OrderInfo"));

        String transactionId = request.getParameter("vnp_TransactionNo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String totalPrice = request.getParameter("vnp_Amount");

//        if (validSign && success) {
            if (success) {
            // ✅ LOG INVOICE ĐÃ THANH TOÁN
            log.info("VNPay SUCCESS - InvoiceId={} - TransactionId={}", orderId, transactionId);
            Order order = new Order();
            order.setStatus(OrderStatus.CONFIRMED);
            order.setUpdatedAt(LocalDateTime.now());
            orderService.updateStatus(Math.toIntExact(orderId), order);
        } else {
            log.warn("VNPay FAILED - InvoiceId={}", orderId);
        }

//        return new VNPayResult(
//                success,
//                invoiceId,
//                transactionId,
//                paymentTime,
//                totalPrice
//        );
    }

}