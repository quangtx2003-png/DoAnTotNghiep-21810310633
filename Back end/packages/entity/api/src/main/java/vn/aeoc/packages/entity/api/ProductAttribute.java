package vn.aeoc.packages.entity.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttribute {

    private Integer id;
    private String fieldName;
    private String name;
    private Integer productId;

    public ProductAttribute(String fieldName, String name, Integer productId) {
        this.fieldName = fieldName;
        this.name = name;
        this.productId = productId;
    }
}
