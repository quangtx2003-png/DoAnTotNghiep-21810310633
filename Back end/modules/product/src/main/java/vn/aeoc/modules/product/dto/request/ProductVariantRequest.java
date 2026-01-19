package vn.aeoc.modules.product.dto.request;

import lombok.Data;
import vn.aeoc.packages.entity.api.ProductVariant;

import java.util.List;

@Data
public class ProductVariantRequest extends ProductVariant {
    private List<Integer> attributeValueIds;
}
