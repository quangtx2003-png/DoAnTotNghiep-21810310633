package vn.aeoc.modules.product.dto.response;

import lombok.Getter;
import lombok.Setter;
import vn.aeoc.packages.entity.api.AttributeValue;

import java.util.List;

@Getter
@Setter
public class ProductAttributeResponse {
    private Integer id;
    private String fieldName;
    private String name;
    private List<AttributeValue> options;
}
