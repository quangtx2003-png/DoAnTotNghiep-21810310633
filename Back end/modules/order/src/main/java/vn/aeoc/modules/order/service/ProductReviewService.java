package vn.aeoc.modules.order.service;

import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import vn.aeoc.modules.order.constant.OrderStatus;
import vn.aeoc.modules.order.repository.OrderRepository;
import vn.aeoc.modules.order.repository.ProductReviewRepository;
import vn.aeoc.modules.product.service.ProductService;
import vn.aeoc.modules.product.service.ProductVariantService;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.Order;
import vn.aeoc.packages.entity.api.Product;
import vn.aeoc.packages.entity.api.ProductReview;
import vn.aeoc.packages.entity.api.ProductVariant;

@AllArgsConstructor
@Service
public class ProductReviewService {

    private final ProductReviewRepository repository;
    private final OrderRepository orderRepository;
    private final ProductVariantService productVariantService;
    private final ProductService productService;

    public Page<ProductReview> getByCriteria(
            Integer productId,
            Integer productVariantId,
            Integer userId,
            Integer rating,
            Pageable pageable) {

        List<ProductReview> list =
                repository.getByCriteria(productId, productVariantId, userId, rating, pageable);

        Long total =
                repository.countByCriteria(productId, productVariantId, userId, rating);

        pageable.setTotal(total);
        return new Page<>(pageable, list);
    }

    @Transactional
    public ProductReview create(ProductReview r) {

        // 1. check order tồn tại & đã hoàn thành
        Order order = orderRepository.getById(r.getOrderId());
        if (order == null || OrderStatus.COMPLETED.equals(order.getStatus())) {
            throw new AppException(ErrorCode.ORDER_ALREADY_FINISHED);
        }

        // 2. không review trùng order item
        if (repository.existsByOrderItem(r.getOrderItemId())) {
            throw new AppException(ErrorCode.DUPLICATED_DATA);
        }

        // 3. validate rating
        if (r.getRating() < 1 || r.getRating() > 5) {
            throw new AppException(ErrorCode.INPUT_WRONG);
        }

        var result = repository.insert(r);
        calculateAvgRating(r.getProductVariantId());
        return result;
    }

    private void calculateAvgRating(Integer productVariantId) {
        ProductVariant variant = productVariantService.getById(productVariantId);
        if (variant == null) {
            return;
        }
        Product product = productService.getById(variant.getProductId());
        if (product == null) {
            return;
        }

        product.setAvgRating(repository.calculateAvgRatingByProductVariant(variant.getProductId()));
        productService.update(product);
    }

    public String delete(Integer id, Integer userId) {

        ProductReview review = repository.getById(id);
        if (review == null) {
            throw new AppException(ErrorCode.DATA_NOT_FOUND);
        }

        //TODO: thêm nếu là admin thì cũng được xóa
        if (userId == null || !userId.equals(review.getUserId())) {
            throw new AppException(ErrorCode.FORBIDDEN);
        }

//        Order order = orderRepository.getById(review.getOrderId());
//        if (order == null || !OrderStatus.COMPLETED.equals(order.getStatus())) {
//            throw new AppException(ErrorCode.ORDER_ALREADY_FINISHED);
//        }

        repository.deleteById(id);

        return "Delete review successfully";
    }
}
