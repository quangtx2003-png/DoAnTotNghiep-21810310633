package vn.aeoc.packages.entity.api;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProductWishlist {
    private Integer productId;
    private LocalDateTime createdAt;
}