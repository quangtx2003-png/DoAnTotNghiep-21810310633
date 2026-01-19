package vn.aeoc.modules.product.dto.response;

import lombok.Data;

@Data
public class VariantAttributeRow {
    private Integer variantId;
    private String fieldName;
    private String value;
}