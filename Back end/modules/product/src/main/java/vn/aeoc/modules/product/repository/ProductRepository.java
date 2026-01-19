package vn.aeoc.modules.product.repository;

import static java.util.Arrays.asList;
import static vn.aeoc.packages.infra.jooq.tables.AttributeValue.ATTRIBUTE_VALUE;
import static vn.aeoc.packages.infra.jooq.tables.Category.CATEGORY;
import static vn.aeoc.packages.infra.jooq.tables.Product.PRODUCT;
import static vn.aeoc.packages.infra.jooq.tables.ProductAttribute.PRODUCT_ATTRIBUTE;
import static vn.aeoc.packages.infra.jooq.tables.ProductVariant.PRODUCT_VARIANT;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.jooq.*;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Repository;

import vn.aeoc.modules.product.dto.request.ProductListRequest;
import vn.aeoc.modules.product.dto.response.ProductDetailRow;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.AiProductSearchQuery;
import vn.aeoc.packages.entity.api.Product;
import vn.aeoc.packages.infra.jooq.config.util.JooqRepositorySupport;
import vn.aeoc.packages.infra.jooq.tables.records.ProductRecord;

@Repository
public class ProductRepository extends JooqRepositorySupport<ProductRecord> {

    public ProductRepository(org.jooq.DSLContext dsl) {
        super(dsl, PRODUCT);
    }

    /* ============================================================
     *  Base config
     * ============================================================ */

    @Override
    protected List<Field<?>> baseFields() {
        return asList(
                PRODUCT.ID, PRODUCT.NAME, PRODUCT.DESCRIPTION, PRODUCT.CATEGORY_ID, PRODUCT.AVG_RATING, PRODUCT.IMAGE, PRODUCT.THUMBNAIL, PRODUCT.ACTIVE
        );
    }

    @Override
    protected Condition baseCondition() {
        return DSL.trueCondition();
    }

    private Condition getHavingCondition(ProductListRequest r) {

        Condition having = DSL.trueCondition();

        if (r.getPriceFrom() != null) {
            having = having.and(
                    DSL.min(PRODUCT_VARIANT.PRICE).ge(r.getPriceFrom())
            );
        }

        if (r.getPriceTo() != null) {
            having = having.and(
                    DSL.max(PRODUCT_VARIANT.PRICE).le(r.getPriceTo())
            );
        }

        return having;
    }

    private Condition getWhereCondition(ProductListRequest r) {

        Condition condition = DSL.trueCondition();

        if (StringUtils.isNotBlank(r.getKeyword())) {
            condition = condition.and(
                    DSL.lower(PRODUCT.NAME).like("%" + r.getKeyword().trim().toLowerCase() + "%")
            );
        }

        if (r.getCategoryId() != null && r.getCategoryId() > 0) {
            condition = condition.and(PRODUCT.CATEGORY_ID.eq(r.getCategoryId()));
        }

        if (r.getIds() != null && !r.getIds().isEmpty()) {
            condition = condition.and(PRODUCT.ID.in(r.getIds()));
        }

        if (r.getAvgRatingFrom() != null) {
            condition = condition.and(PRODUCT.AVG_RATING.ge(r.getAvgRatingFrom()));
        }

        if (r.getAvgRatingTo() != null) {
            condition = condition.and(PRODUCT.AVG_RATING.le(r.getAvgRatingTo()));
        }

        if (r.getActive() != null) {
            condition = condition.and(PRODUCT.ACTIVE.eq(r.getActive()));
        }

        return condition;
    }

    private SortField<?> getSort(ProductListRequest r) {

        String sortBy = r.getSortBy();
        String sortDir = r.getSortDir();

        boolean asc = "asc".equalsIgnoreCase(sortDir);

        if ("minPrice".equalsIgnoreCase(sortBy)) {
            return asc ? DSL.min(PRODUCT_VARIANT.PRICE).asc() : DSL.min(PRODUCT_VARIANT.PRICE).desc();
        }

        if ("maxPrice".equalsIgnoreCase(sortBy)) {
            return asc ? DSL.max(PRODUCT_VARIANT.PRICE).asc() : DSL.max(PRODUCT_VARIANT.PRICE).desc();
        }

        if ("name".equalsIgnoreCase(sortBy)) {
            return asc ? PRODUCT.NAME.asc() : PRODUCT.NAME.desc();
        }

        if ("avgRating".equalsIgnoreCase(sortBy)) {
            return asc ? PRODUCT.AVG_RATING.asc() : PRODUCT.AVG_RATING.desc();
        }

        // default
        return PRODUCT.ID.desc();
    }


    private Condition getWhereCondition(
                                        String keyword, Integer categoryId, Integer active) {

        Condition condition = DSL.trueCondition();

        if (StringUtils.isNotBlank(keyword)) {
            condition = condition.and(
                    DSL.lower(PRODUCT.NAME).like("%" + keyword.trim().toLowerCase() + "%"));
        }

        if (categoryId != null && categoryId > 0) {
            condition = condition.and(PRODUCT.CATEGORY_ID.eq(categoryId));
        }

        if (active != null) {
            condition = condition.and(PRODUCT.ACTIVE.eq(active));
        }

        return condition;
    }

    /* ============================================================
     *  List & Count
     * ============================================================ */

    public List<Product> getByCriteria(
                                       ProductListRequest request, Pageable pageable) {

        List<Field<?>> fields = withBase(
                DSL.coalesce(
                        DSL.min(PRODUCT_VARIANT.PRICE),
                        DSL.inline(0.0)).as("min_price"),
                DSL.coalesce(DSL.max(PRODUCT_VARIANT.PRICE),
                        DSL.inline(0.0)).as("max_price"),
                DSL.coalesce(DSL.min(PRODUCT_VARIANT.ORIGINAL_PRICE),
                        DSL.inline(0.0)).as("original_min_price"),
                DSL.coalesce(DSL.max(PRODUCT_VARIANT.ORIGINAL_PRICE),
                        DSL.inline(0.0)).as("original_max_price"),
                CATEGORY.NAME.as("category_name")
        );

        return dsl.select(fields)
                .from(PRODUCT)
                .leftJoin(PRODUCT_VARIANT).on(PRODUCT_VARIANT.PRODUCT_ID.eq(PRODUCT.ID))
                .leftJoin(CATEGORY).on(CATEGORY.ID.eq(PRODUCT.CATEGORY_ID))
                .where(getWhereCondition(request))
                .groupBy(PRODUCT.ID)
                .having(getHavingCondition(request))
                .orderBy(getSort(request))
                .offset(pageable.getOffset())
                .limit(pageable.getLimit())
                .fetchInto(Product.class);
    }

    public long countByCriteria(ProductListRequest request) {

        return dsl.selectCount().from(
                dsl.select(PRODUCT.ID).from(PRODUCT).leftJoin(PRODUCT_VARIANT).on(PRODUCT_VARIANT.PRODUCT_ID.eq(PRODUCT.ID)).where(getWhereCondition(request)).groupBy(PRODUCT.ID).having(getHavingCondition(request))
        ).fetchOne(0, long.class);
    }

    /* ============================================================
     *  Detail queries (JOIN – giữ nguyên)
     * ============================================================ */

    public List<ProductDetailRow> fetchProductDetailByProductIds(
                                                                 List<Integer> productIds) {

        return dsl.select(
                PRODUCT.ID.as("product_id"), PRODUCT.NAME.as("product_name"), PRODUCT.DESCRIPTION.as("product_description"),
                PRODUCT_ATTRIBUTE.ID.as("attribute_id"), PRODUCT_ATTRIBUTE.FIELD_NAME.as("attribute_code"), PRODUCT_ATTRIBUTE.NAME.as("attribute_name"),
                ATTRIBUTE_VALUE.ID.as("value_id"), ATTRIBUTE_VALUE.VALUE.as("value")
        ).from(PRODUCT).join(PRODUCT_ATTRIBUTE).on(PRODUCT_ATTRIBUTE.PRODUCT_ID.eq(PRODUCT.ID)).join(ATTRIBUTE_VALUE).on(ATTRIBUTE_VALUE.ATTRIBUTE_ID.eq(PRODUCT_ATTRIBUTE.ID)).where(PRODUCT.ID.in(productIds)).orderBy(
                PRODUCT.ID.asc(), PRODUCT_ATTRIBUTE.ID.asc(), ATTRIBUTE_VALUE.ID.asc()
        ).fetchInto(ProductDetailRow.class);
    }

    public List<ProductDetailRow> fetchProductDetailByProductId(
                                                          Integer productId) {

        SelectConditionStep<?> select = dsl.select(
                PRODUCT.ID.as("product_id"), PRODUCT.NAME.as("product_name"), PRODUCT.DESCRIPTION.as("product_description"),
                PRODUCT_ATTRIBUTE.ID.as("attribute_id"), PRODUCT_ATTRIBUTE.FIELD_NAME.as("attribute_code"), PRODUCT_ATTRIBUTE.NAME.as("attribute_name"),
                ATTRIBUTE_VALUE.ID.as("value_id"), ATTRIBUTE_VALUE.VALUE.as("value")
        ).from(PRODUCT).join(PRODUCT_ATTRIBUTE).on(PRODUCT_ATTRIBUTE.PRODUCT_ID.eq(PRODUCT.ID)).join(ATTRIBUTE_VALUE).on(ATTRIBUTE_VALUE.ATTRIBUTE_ID.eq(PRODUCT_ATTRIBUTE.ID)).where(PRODUCT.ID.eq(productId));

        return select
                .orderBy(
                        PRODUCT.ID.asc(), PRODUCT_ATTRIBUTE.ID.asc(), ATTRIBUTE_VALUE.ID.asc())
                .fetchInto(ProductDetailRow.class);
    }

    /* ============================================================
     *  Get one
     * ============================================================ */

    public Product getById(Integer id) {

        List<Field<?>> fields = withBase(
                DSL.coalesce(
                        DSL.min(PRODUCT_VARIANT.PRICE),
                        DSL.inline(0.0)).as("min_price"),
                DSL.coalesce(DSL.max(PRODUCT_VARIANT.PRICE),
                        DSL.inline(0.0)).as("max_price"),
                DSL.coalesce(DSL.min(PRODUCT_VARIANT.ORIGINAL_PRICE),
                        DSL.inline(0.0)).as("original_min_price"),
                DSL.coalesce(DSL.max(PRODUCT_VARIANT.ORIGINAL_PRICE),
                        DSL.inline(0.0)).as("original_max_price"),
                CATEGORY.NAME.as("category_name")
        );

        return dsl.select(fields)
                .from(PRODUCT)
                .leftJoin(PRODUCT_VARIANT).on(PRODUCT_VARIANT.PRODUCT_ID.eq(PRODUCT.ID))
                .leftJoin(CATEGORY).on(CATEGORY.ID.eq(PRODUCT.CATEGORY_ID))
                .where(PRODUCT.ID.eq(id))
                .groupBy(PRODUCT.ID)
                .fetchOptionalInto(Product.class)
                .orElse(new Product());
    }

    /* ============================================================
     *  Insert / Update / Delete
     * ============================================================ */

    public Product insert(Product product) {
        return insertReturning(
                dsl.insertInto(PRODUCT)
                        .set(PRODUCT.NAME, product.getName())
                        .set(PRODUCT.DESCRIPTION, product.getDescription())
                        .set(PRODUCT.CATEGORY_ID, product.getCategoryId())
                        .set(PRODUCT.IMAGE, product.getImage())
                        .set(PRODUCT.AVG_RATING, 0.0)
                        .set(PRODUCT.THUMBNAIL, product.getThumbnail())
                        .set(PRODUCT.ACTIVE, product.getActive())
                , Product.class
        );
    }

    public Product update(Product product) {
        updateBy(
                PRODUCT.ID.eq(product.getId()), fields(
                        PRODUCT.NAME, product.getName(),
                        PRODUCT.DESCRIPTION, product.getDescription(),
                        PRODUCT.CATEGORY_ID, product.getCategoryId(),
                        PRODUCT.IMAGE, product.getImage(),
                        PRODUCT.THUMBNAIL,
                        product.getThumbnail(),
                        PRODUCT.ACTIVE,
                        product.getActive()
                )
        );
        return product;
    }

    public Integer delete(Integer id) {
        return deleteBy(PRODUCT.ID.eq(id));
    }


}
