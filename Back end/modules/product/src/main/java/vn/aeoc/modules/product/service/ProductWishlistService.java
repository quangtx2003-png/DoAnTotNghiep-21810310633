package vn.aeoc.modules.product.service;
import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import vn.aeoc.modules.product.repository.ProductWishlistRepository;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductWishlist;

@AllArgsConstructor
@Service
public class ProductWishlistService {

    private final ProductWishlistRepository repository;

    public Page<ProductWishlist> getByCriteria(
            Integer userId,
            Integer productId,
            Pageable pageable) {

        List<ProductWishlist> list =
                repository.getByCriteria(userId, productId, pageable);

        Long total =
                repository.countByCriteria(userId, productId);

        pageable.setTotal(total);
        return new Page<>(pageable, list);
    }

    public List<ProductWishlist> getByUserId(Integer userId) {
        return repository.getByUserId(userId);
    }

    public void add(Integer userId, Integer productId) {
        if (repository.exists(userId, productId)) {
            throw new AppException(ErrorCode.DUPLICATED_DATA);
        }
        repository.insert(userId, productId);
    }

    public void remove(Integer userId, Integer productId) {
        repository.delete(userId, productId);
    }

    public void clearByUser(Integer userId) {
        repository.deleteByUserId(userId);
    }
}
