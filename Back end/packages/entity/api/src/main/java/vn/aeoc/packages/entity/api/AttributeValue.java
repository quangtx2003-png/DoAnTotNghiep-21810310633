package vn.aeoc.packages.entity.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttributeValue {

    private Integer id;
    private Integer attributeId;
    private String value;
}
