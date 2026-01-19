package vn.aeoc.modules.product.service;

import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import vn.aeoc.modules.product.repository.ProductVariantAttributeRepository;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductVariantAttribute;

@AllArgsConstructor
@Service
public class ProductVariantAttributeService {

    private final ProductVariantAttributeRepository repository;

    public Page<ProductVariantAttribute> getByCriteria(
            Integer variantId,
            Integer attributeValueId,
            Pageable pageable) {

        List<ProductVariantAttribute> list =
                repository.getByCriteria(variantId, attributeValueId, pageable);

        Long total =
                repository.countByCriteria(variantId, attributeValueId);

        pageable.setTotal(total);
        return new Page<>(pageable, list);
    }

    public List<ProductVariantAttribute> getByVariantId(Integer variantId) {
        return repository.getByVariantId(variantId);
    }

    public void create(ProductVariantAttribute pva) {
        if (repository.exists(pva.getVariantId(), pva.getAttributeValueId())) {
            throw new AppException(ErrorCode.DUPLICATED_DATA);
        }
        repository.insert(pva);
    }

    public void delete(Integer variantId, Integer attributeValueId) {
        repository.delete(variantId, attributeValueId);
    }

    public void deleteByVariantId(Integer variantId) {
        repository.deleteByVariantId(variantId);
    }
}
