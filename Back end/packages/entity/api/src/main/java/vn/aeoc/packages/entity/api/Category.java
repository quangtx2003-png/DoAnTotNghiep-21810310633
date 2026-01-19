package vn.aeoc.packages.entity.api;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Category {

    private Integer id;
    @NotBlank(message = "Tên Danh mục không được để trống")
    private String name;
    private String description;
}
