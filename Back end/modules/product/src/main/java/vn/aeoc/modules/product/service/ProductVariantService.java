package vn.aeoc.modules.product.service;

import java.util.*;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import org.jooq.Record2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.aeoc.modules.product.dto.request.ProductVariantRequest;
import vn.aeoc.modules.product.dto.response.ProductVariantResponse;
import vn.aeoc.modules.product.dto.response.VariantAttributeRow;
import vn.aeoc.modules.product.repository.ProductVariantRepository;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductVariant;
import vn.aeoc.packages.entity.api.ProductVariantAttribute;

@AllArgsConstructor
@Service
public class ProductVariantService {

    private final ProductVariantRepository productVariantRepository;
    private final ProductVariantAttributeService productVariantAttributeService;

    public ProductVariant getById(Integer id) {
        return productVariantRepository.getById(id);
    }

    public ProductVariantResponse getDetail(Integer id) {

        ProductVariant variant = productVariantRepository.getById(id);
        if (variant == null) {
            throw new AppException(ErrorCode.DATA_NOT_FOUND);
        }

        List<VariantAttributeRow> rows =
                productVariantRepository.fetchVariantAttributes(id);

        Map<String, String> options =
                rows.stream()
                        .collect(Collectors.toMap(
                                VariantAttributeRow::getFieldName,
                                VariantAttributeRow::getValue,
                                (v1, v2) -> v1,
                                LinkedHashMap::new
                        ));

        return new ProductVariantResponse(variant, options);
    }

    public List<ProductVariantResponse> getDetailByIds(List<Integer> ids) {

        if (ids == null || ids.isEmpty()) {
            return List.of();
        }

        // 1. Fetch variants
        List<ProductVariant> variants =
                productVariantRepository.getByIds(ids);

        if (variants.isEmpty()) {
            throw new AppException(ErrorCode.DATA_NOT_FOUND);
        }

        // 2. Fetch attributes (1 query)
        List<VariantAttributeRow> rows =
                productVariantRepository.fetchVariantAttributesByVariantIds(ids);

        // 3. Group attribute by variantId
        Map<Integer, Map<String, String>> optionMap = new HashMap<>();

        for (VariantAttributeRow r : rows) {
            optionMap
                    .computeIfAbsent(r.getVariantId(), k -> new LinkedHashMap<>())
                    .put(r.getFieldName(), r.getValue());
        }

        // 4. Build response
        List<ProductVariantResponse> result = new ArrayList<>();

        for (ProductVariant v : variants) {
            Map<String, String> options =
                    optionMap.getOrDefault(v.getId(), Map.of());

            result.add(new ProductVariantResponse(v, options));
        }

        return result;
    }

    public Page<ProductVariant> getByCriteria(
            Integer productId, String keyword, Pageable pageable) {

        List<ProductVariant> list =
                productVariantRepository.getByCriteria(productId, keyword, pageable);

        Long total =
                productVariantRepository.countByCriteria(productId, keyword);

        pageable.setTotal(total);
        return new Page<>(pageable, list);
    }

    public List<ProductVariant> getByProductId(Integer productId) {
        return productVariantRepository.getByProductId(productId);
    }

    @Transactional
    public ProductVariant create(ProductVariantRequest request) {
        if (productVariantRepository.existsBySku(request.getSku())) {
            throw new AppException(ErrorCode.DUPLICATED_DATA);
        }

        List<Integer> attributeValueIds = request.getAttributeValueIds();
        if (attributeValueIds == null || attributeValueIds.isEmpty()) {
            throw new AppException(ErrorCode.INPUT_WRONG);
        }

        // check duplicate attributeValueId trong request
        long distinctCount = attributeValueIds.stream().distinct().count();
        if (distinctCount != attributeValueIds.size()) {
            throw new AppException(ErrorCode.INPUT_WRONG);
        }

        // 2. Insert ProductVariant
        ProductVariant insertedVariant = productVariantRepository.insert(request);

        Integer variantId = insertedVariant.getId();

        // 3. Insert ProductVariantAttribute
        for (Integer attributeValueId : attributeValueIds) {

            ProductVariantAttribute pva = new ProductVariantAttribute();
            pva.setVariantId(variantId);
            pva.setAttributeValueId(attributeValueId);

            productVariantAttributeService.create(pva);
        }

        return insertedVariant;
    }

    @Transactional
    public void update(Integer id, ProductVariantRequest request) {

        ProductVariant existing = productVariantRepository.getById(id);
        if (existing == null) {
            throw new AppException(ErrorCode.DATA_NOT_FOUND);
        }

        productVariantRepository.update(id, request);

        List<Integer> attributeValueIds = request.getAttributeValueIds();
        if (attributeValueIds != null) {

            if (attributeValueIds.isEmpty()) {
                throw new AppException(ErrorCode.INPUT_WRONG);
            }

            if (attributeValueIds.stream().distinct().count() != attributeValueIds.size()) {
                throw new AppException(ErrorCode.INPUT_WRONG);
            }

            // 4.1 Xoá toàn bộ attribute cũ
            productVariantAttributeService.deleteByVariantId(id);

            // 4.2 Insert lại attribute mới
            for (Integer attributeValueId : attributeValueIds) {
                ProductVariantAttribute pva = new ProductVariantAttribute();
                pva.setVariantId(id);
                pva.setAttributeValueId(attributeValueId);
                productVariantAttributeService.create(pva);
            }
        }
    }

    public void delete(Integer id) {
        productVariantRepository.deleteById(id);
    }
}