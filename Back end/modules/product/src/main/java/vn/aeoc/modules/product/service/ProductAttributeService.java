package vn.aeoc.modules.product.service;

import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import vn.aeoc.modules.product.repository.ProductAttributeRepository;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductAttribute;

@AllArgsConstructor
@Service
public class ProductAttributeService {

    private final ProductAttributeRepository productAttributeRepository;

    public ProductAttribute getById(Integer id) {
        return productAttributeRepository.getById(id);
    }

    public Page<ProductAttribute> getByCriteria(
            Integer productId,
            String keyword,
            Pageable pageable) {

        List<ProductAttribute> list =
                productAttributeRepository.getByCriteria(productId, keyword, pageable);

        Long total =
                productAttributeRepository.countByCriteria(productId, keyword);

        pageable.setTotal(total);
        return new Page<>(pageable, list);
    }

    public List<ProductAttribute> getByProductId(Integer productId) {
        return productAttributeRepository.getByProductId(productId);
    }

    public ProductAttribute create(ProductAttribute attr) {
        if (productAttributeRepository.existsByFieldName(attr.getProductId(), attr.getFieldName())) {
            throw new AppException(ErrorCode.DUPLICATED_DATA);
        }
        return productAttributeRepository.insert(attr);
    }

    public void update(Integer id, ProductAttribute attr) {
        productAttributeRepository.update(id, attr);
    }

    public void delete(Integer id) {
        productAttributeRepository.deleteById(id);
    }
}
