package vn.aeoc.modules.product.service;

import java.awt.*;
import java.util.*;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import org.springframework.transaction.annotation.Transactional;
import vn.aeoc.modules.product.dto.request.ProductListRequest;
import vn.aeoc.modules.product.dto.response.*;
import vn.aeoc.modules.product.repository.AttributeValueRepository;
import vn.aeoc.modules.product.repository.ProductRepository;
import vn.aeoc.modules.product.repository.ProductVariantRepository;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.AttributeValue;
import vn.aeoc.packages.entity.api.Product;
import vn.aeoc.packages.entity.api.ProductAttribute;

@Slf4j(topic = "PRODUCT-SERVICE")
@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ProductAttributeService productAttributeService;
    private final AttributeValueRepository attributeValueRepository;

    public Page<Product> getByCriteria(
                                       ProductListRequest request, Pageable pageable) {

        List<Product> list = productRepository.getByCriteria(request, pageable);

        Long total = productRepository.countByCriteria(request);

        pageable.setTotal(total);
        return new Page<>(pageable, list);
    }

    public ProductDetailResponse getById(Integer id) {

        // 1. Get product
        Product product = productRepository.getById(id);
        if (product == null || product.getId() == null) {
            throw new AppException(ErrorCode.DATA_NOT_FOUND);
        }

        // 2. Init response
        ProductDetailResponse response = new ProductDetailResponse(product);

        // 3. Fetch attributes + options
        List<ProductDetailRow> attributeRows =
                productRepository.fetchProductDetailByProductId(id);

        Map<Integer, ProductAttributeResponse> attributeMap = new LinkedHashMap<>();

        for (ProductDetailRow r : attributeRows) {

            ProductAttributeResponse attr = attributeMap.computeIfAbsent(
                    r.getAttributeId(),
                    k -> {
                        ProductAttributeResponse a = new ProductAttributeResponse();
                        a.setId(r.getAttributeId());
                        a.setFieldName(r.getAttributeCode());
                        a.setName(r.getAttributeName());
                        a.setOptions(new ArrayList<>());
                        response.getAttributes().add(a);
                        return a;
                    }
            );

            AttributeValue opt = new AttributeValue();
            opt.setId(r.getValueId());
            opt.setValue(r.getValue());
            opt.setAttributeId(r.getAttributeId());

            attr.getOptions().add(opt);
        }

        // 4. Fetch variants + options
        List<ProductVariantRow> variantRows =
                productVariantRepository.fetchVariantDetailByProductId(id);

        Map<Integer, ProductVariantResponse> variantMap = new LinkedHashMap<>();

        for (ProductVariantRow r : variantRows) {

            ProductVariantResponse variant = variantMap.computeIfAbsent(
                    r.getId(),
                    k -> {
                        ProductVariantResponse v =
                                new ProductVariantResponse(r, new LinkedHashMap<>());
                        response.getVariants().add(v);
                        return v;
                    }
            );

            variant.getOptions().put(
                    r.getFieldName(),
                    r.getValue()
            );
        }

        return response;
    }


    public Product insert(Product product) {
        return productRepository.insert(product);
    }

    public Product update(Product product) {
        return productRepository.update(product);
    }

    @Transactional
    public Product createWithStaticAttributes(Product product) {
        Product created = productRepository.insert(product);
        ProductAttribute attr1 = new ProductAttribute("color", "Màu sắc", created.getId());
        ProductAttribute attr2 = new ProductAttribute("size", "Kích cỡ", created.getId());

        var attr1Inserted = productAttributeService.create(attr1);
        var attr2Inserted = productAttributeService.create(attr2);

        AttributeValue value1 = new AttributeValue(null, attr1Inserted.getId(), "default");
        AttributeValue value2 = new AttributeValue(null, attr2Inserted.getId(), "default");

        attributeValueRepository.insert(value1);
        attributeValueRepository.insert(value2);
        return created;
    }

    public Integer delete(Integer id) {
        return productRepository.delete(id);
    }

    public Page<ProductDetailResponse> getProductDetailList(
                                                            ProductListRequest request, Pageable pageable) {

        // 1. Query product list
        List<Product> products = productRepository.getByCriteria(request, pageable);

        Long total = productRepository.countByCriteria(request);

        if (products.isEmpty()) {
            pageable.setTotal(total);
            return new Page<>(pageable, List.of());
        }

        List<Integer> productIds = products.stream().map(Product::getId).toList();

        // 2. Query attributes + options (ALL products)
        List<ProductDetailRow> attributeRows = productRepository.fetchProductDetailByProductIds(productIds);

        // 3. Query variants + options (ALL products)
        List<ProductVariantRow> variantRows = productVariantRepository.fetchVariantDetailByProductIds(productIds);

        // 4. Build response
        Map<Integer, ProductDetailResponse> productMap = new LinkedHashMap<>();

        // 4.1 Init product base
        for (Product p : products) {
            ProductDetailResponse r = new ProductDetailResponse(p);
            productMap.put(p.getId(), r);
        }

        // 4.2 Attributes
        Map<Integer, Map<Integer, ProductAttributeResponse>> attrMap = new HashMap<>();

        for (ProductDetailRow r : attributeRows) {

            ProductDetailResponse product = productMap.get(r.getProductId());

            if (product == null) continue;

            Map<Integer, ProductAttributeResponse> attrs = attrMap.computeIfAbsent(
                    r.getProductId(), k -> new LinkedHashMap<>()
            );

            ProductAttributeResponse attr = attrs.computeIfAbsent(
                    r.getAttributeId(), k -> {
                        ProductAttributeResponse a = new ProductAttributeResponse();
                        a.setId(r.getAttributeId());
                        a.setFieldName(r.getAttributeCode());
                        a.setName(r.getAttributeName());
                        a.setOptions(new ArrayList<>());
                        product.getAttributes().add(a);
                        return a;
                    }
            );

            AttributeValue opt = new AttributeValue();
            opt.setId(r.getValueId());
            opt.setValue(r.getValue());
            opt.setAttributeId(r.getAttributeId());

            attr.getOptions().add(opt);
        }

        // 4.3 Variants
        Map<Integer, Map<Integer, ProductVariantResponse>> variantMap = new HashMap<>();

        for (ProductVariantRow r : variantRows) {

            ProductDetailResponse product = productMap.get(r.getProductId());

            if (product == null) continue;

            Map<Integer, ProductVariantResponse> variants = variantMap.computeIfAbsent(
                    r.getProductId(), k -> new LinkedHashMap<>()
            );

            ProductVariantResponse v = variants.computeIfAbsent(
                    r.getId(), k -> {
                        ProductVariantResponse vr = new ProductVariantResponse(r, new LinkedHashMap<>());
                        product.getVariants().add(vr);
                        return vr;
                    }
            );

            v.getOptions().put(
                    r.getFieldName(), r.getValue()
            );
        }

        pageable.setTotal(total);
        return new Page<>(pageable, new ArrayList<>(productMap.values()));
    }

}
