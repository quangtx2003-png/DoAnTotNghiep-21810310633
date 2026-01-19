package vn.aeoc.packages.entity.api;

import lombok.Data;

import java.util.List;

@Data
public class AiProductSearchQuery {

    private String intent;           // "SEARCH_PRODUCT" | "CHAT"

    private List<String> keywords;

    private Integer categoryId;
    private Double priceFrom;
    private Double priceTo;

    private Boolean expensive;
    private Boolean cheap;

    private Integer active;
    private Integer limit;
}