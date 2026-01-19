package vn.aeoc.modules.order.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.aeoc.modules.order.dto.request.OrderItemRequest;
import vn.aeoc.modules.order.repository.OrderItemRepository;
import vn.aeoc.modules.product.repository.ProductVariantRepository;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.entity.api.OrderItem;
import vn.aeoc.packages.entity.api.ProductVariant;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class OrderItemService {

    private final OrderItemRepository repository;
    private final ProductVariantRepository productVariantRepository;

    @Transactional
    public OrderItem create(
            Integer orderId,
            Integer productVariantId,
            Integer quantity) {

        if (quantity == null || quantity <= 0) {
            throw new AppException(ErrorCode.INPUT_WRONG);
        }

        // 1. Lấy variant
        ProductVariant variant =
                productVariantRepository.getById(productVariantId);

        if (variant == null) {
            throw new AppException(ErrorCode.DATA_NOT_FOUND);
        }

        // 2. Snapshot giá
        Double price = variant.getPrice();
        Double totalPrice = price * quantity;

        OrderItem item = new OrderItem();
        item.setOrderId(orderId);
        item.setProductId(variant.getProductId());
        item.setProductVariantId(productVariantId);
        item.setPrice(price);
        item.setQuantity(quantity);
        item.setTotalPrice(totalPrice);

        return repository.insert(item);
    }

    @Transactional
    public Double createMany(
            Integer orderId,
            List<OrderItemRequest> requests) {

        if ((requests == null) || requests.isEmpty()) {
            throw new AppException(ErrorCode.INPUT_WRONG);
        }

        List<OrderItem> items = new ArrayList<>();

        Double orderPrice = 0.0;

        for (OrderItemRequest req : requests) {

            if (req.getQuantity() == null || req.getQuantity() <= 0) {
                throw new AppException(ErrorCode.INPUT_WRONG);
            }

            ProductVariant variant =
                    productVariantRepository.getById(req.getProductVariantId());

            if (variant == null) {
                throw new AppException(ErrorCode.DATA_NOT_FOUND);
            }

            Double price = variant.getPrice();
            Double totalPrice = price * req.getQuantity();

            orderPrice = orderPrice + totalPrice;

            OrderItem item = new OrderItem();
            item.setOrderId(orderId);
            item.setProductId(variant.getProductId());
            item.setProductVariantId(req.getProductVariantId());
            item.setPrice(price);
            item.setQuantity(req.getQuantity());
            item.setTotalPrice(totalPrice);

            items.add(item);
        }

        repository.insertMany(items);
        return orderPrice;
    }

    public Double calculateTotalAmount(List<OrderItemRequest> items) {
        if (items == null || items.isEmpty()) {
            throw new AppException(ErrorCode.INPUT_WRONG);
        }

        Double total = 0.0;
        for (OrderItemRequest req : items) {
            if (req.getQuantity() == null || req.getQuantity() <= 0) {
                throw new AppException(ErrorCode.INPUT_WRONG);
            }

            ProductVariant variant = productVariantRepository.getById(req.getProductVariantId());
            if (variant == null) {
                throw new AppException(ErrorCode.DATA_NOT_FOUND);
            }

            total += variant.getPrice() * req.getQuantity();
        }
        return total;
    }

}
