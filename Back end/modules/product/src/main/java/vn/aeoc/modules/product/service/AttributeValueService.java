package vn.aeoc.modules.product.service;


import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import vn.aeoc.modules.product.repository.AttributeValueRepository;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.AttributeValue;

@AllArgsConstructor
@Service
public class AttributeValueService {

    private final AttributeValueRepository repository;

    public AttributeValue getById(Integer id) {
        return repository.getById(id);
    }

    public Page<AttributeValue> getByCriteria(
            Integer attributeId,
            String keyword,
            Pageable pageable) {

        List<AttributeValue> list =
                repository.getByCriteria(attributeId, keyword, pageable);

        Long total =
                repository.countByCriteria(attributeId, keyword);

        pageable.setTotal(total);
        return new Page<>(pageable, list);
    }

    public List<AttributeValue> getByAttributeId(Integer attributeId) {
        return repository.getByAttributeId(attributeId);
    }

    public AttributeValue create(AttributeValue val) {
        if (repository.existsByValue(val.getAttributeId(), val.getValue())) {
            throw new AppException(ErrorCode.DUPLICATED_DATA);
        }
        return repository.insert(val);
    }

    public void update(Integer id, AttributeValue val) {
        repository.update(id, val);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
