package vn.aeoc.modules.order.service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import vn.aeoc.modules.order.config.VNPayConfig;
import vn.aeoc.modules.order.constant.PaymentMethod;
import vn.aeoc.modules.order.dto.request.OrderRequest;
import vn.aeoc.modules.order.repository.OrderItemRepository;
import vn.aeoc.modules.order.repository.OrderRepository;
import vn.aeoc.modules.order.dto.response.OrderResponse;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.Order;
import vn.aeoc.packages.entity.api.OrderItem;

@AllArgsConstructor
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderItemService orderItemService;
    private final PayOSService payOSService;

    public Order getById(Integer id) {
        return orderRepository.getById(id);
    }

    public Page<Order> getByCriteria(
            Integer userId,
            String orderStatus,
            String paymentStatus,
            Pageable pageable) {

        List<Order> list =
                orderRepository.getByCriteria(userId, orderStatus, paymentStatus, pageable);

        Long total =
                orderRepository.countByCriteria(userId, orderStatus, paymentStatus);

        pageable.setTotal(total);
        return new Page<>(pageable, list);
    }

    public OrderResponse getDetail(Integer id) {

        // 1. Order
        Order order = orderRepository.getById(id);
        if (order == null) {
            throw new AppException(ErrorCode.DATA_NOT_FOUND);
        }

        List<OrderItem> items =
                orderItemRepository.fetchOrderItemDetail(id);

        // 3. Assemble response
        OrderResponse response = new OrderResponse(order, items);
        return response;
    }

    @Transactional
    public String create(OrderRequest req) {
        req.setId(generateRandomOrderId());

        Double totalAmount = orderItemService.calculateTotalAmount(req.getItems());
        req.setTotalAmount(totalAmount);
        req.setFinalAmount(totalAmount);

        Order inserted = orderRepository.insert(req);
        Integer orderId = inserted.getId();

        //dùng nếu muốn bảo mật hơn
        orderItemService.createMany(orderId, req.getItems());

        String returnUrl = req.getPaymentReturnUrl();

        switch (req.getPaymentMethod()) {
            case PaymentMethod.VNPAY:
                return createVnpayOrder(Long.valueOf(orderId), totalAmount, "https://exciting-earliest-educated-happened.trycloudflare.com");
            case PaymentMethod.PAYOS:
                return payOSService.createPayOSOrder(orderId, totalAmount);
            case PaymentMethod.COD:
                return "";
            default:
                throw new IllegalArgumentException(
                        "Unsupported payment type: " + req.getPaymentMethod()
                );
        }
    }
    public void update(Integer id, Order o) {
        orderRepository.update(id, o);
    }

    public void updateStatus(Integer id, Order o) {
        orderRepository.updateStatus(id, o);
    }

    public String createVnpayOrder(Long orderId, Double total, String urlReturn) {
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
        String orderType = "order-type";

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        long vnpAmount = Math.round(total * 100);
        vnp_Params.put("vnp_Amount", String.valueOf(vnpAmount));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", String.valueOf(orderId));
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = "vn";
        vnp_Params.put("vnp_Locale", locate);

        urlReturn += VNPayConfig.vnp_Returnurl;
        vnp_Params.put("vnp_ReturnUrl", urlReturn);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                try {
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    //Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;
    }

    private Integer generateRandomOrderId() {
        return ThreadLocalRandom.current().nextInt(1, 2_000_000_000);
    }
}
