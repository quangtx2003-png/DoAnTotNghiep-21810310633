package vn.aeoc.modules.product.dto.response;

import lombok.Data;
import vn.aeoc.packages.entity.api.ProductVariant;

import java.time.LocalDateTime;

@Data
public class ProductVariantRow extends ProductVariant {
    private String fieldName;
    private String value;
}