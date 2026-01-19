package vn.aeoc.modules.product.repository;

import static vn.aeoc.packages.infra.jooq.tables.AttributeValue.ATTRIBUTE_VALUE;
import static vn.aeoc.packages.infra.jooq.tables.Product.PRODUCT;
import static vn.aeoc.packages.infra.jooq.tables.ProductAttribute.PRODUCT_ATTRIBUTE;
import static vn.aeoc.packages.infra.jooq.tables.ProductVariant.PRODUCT_VARIANT;
import static vn.aeoc.packages.infra.jooq.tables.ProductVariantAttribute.PRODUCT_VARIANT_ATTRIBUTE;

import java.util.List;

import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.Record2;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Repository;

import vn.aeoc.modules.product.dto.response.ProductVariantRow;
import vn.aeoc.modules.product.dto.response.VariantAttributeRow;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductVariant;
import vn.aeoc.packages.infra.jooq.config.util.JooqRepositorySupport;
import vn.aeoc.packages.infra.jooq.tables.records.ProductVariantRecord;

@Repository
public class ProductVariantRepository extends JooqRepositorySupport<ProductVariantRecord> {

    public ProductVariantRepository(org.jooq.DSLContext dsl) {
        super(dsl, PRODUCT_VARIANT);
    }

    @Override
    protected List<Field<?>> baseFields() {
        return List.of(
                PRODUCT_VARIANT.ID,
                PRODUCT_VARIANT.PRODUCT_ID,
                PRODUCT_VARIANT.SKU,
                PRODUCT_VARIANT.IMAGE,
                PRODUCT_VARIANT.PRICE,
                PRODUCT_VARIANT.ORIGINAL_PRICE,
                PRODUCT_VARIANT.STOCK,
                PRODUCT_VARIANT.CREATED_AT
        );
    }

    @Override
    protected Condition baseCondition() {
        return DSL.trueCondition();
    }

    private Condition getWhereCondition(Integer productId, String keyword) {
        Condition condition = DSL.trueCondition();

        if (productId != null) {
            condition = condition.and(PRODUCT_VARIANT.PRODUCT_ID.eq(productId));
        }

        if (keyword != null && !keyword.isBlank()) {
            condition = condition.and(PRODUCT_VARIANT.SKU.likeIgnoreCase("%" + keyword.trim() + "%"));
        }

        return condition;
    }

    /* ============================================================
     *  Queries
     * ============================================================ */

    public List<ProductVariant> getByCriteria(
            Integer productId, String keyword, Pageable pageable) {

        return selectPage(
                getWhereCondition(productId, keyword),
                pageable,
                ProductVariant.class,
                OrderBy.desc(PRODUCT_VARIANT.ID)
        );
    }

    public List<ProductVariantRow> fetchVariantDetail(Integer productId) {

        return dsl.select(
                        PRODUCT_VARIANT.ID.as("variant_id"),
                        PRODUCT_VARIANT.SKU.as("sku"),
                        PRODUCT_VARIANT.IMAGE.as("image"),
                        PRODUCT_VARIANT.PRICE.as("price"),
                        PRODUCT_VARIANT.ORIGINAL_PRICE.as("original_price"),
                        PRODUCT_VARIANT.STOCK.as("stock"),
                        PRODUCT_VARIANT.PRODUCT_ID.as("product_id"),
                        PRODUCT_VARIANT.CREATED_AT.as("created_at"),
                        PRODUCT_ATTRIBUTE.FIELD_NAME.as("field_name"),
                        ATTRIBUTE_VALUE.VALUE.as("value")
                )
                .from(PRODUCT_VARIANT)
                .join(PRODUCT_VARIANT_ATTRIBUTE)
                .on(PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID.eq(PRODUCT_VARIANT.ID))
                .join(ATTRIBUTE_VALUE)
                .on(ATTRIBUTE_VALUE.ID.eq(PRODUCT_VARIANT_ATTRIBUTE.ATTRIBUTE_VALUE_ID))
                .join(PRODUCT_ATTRIBUTE)
                .on(PRODUCT_ATTRIBUTE.ID.eq(ATTRIBUTE_VALUE.ATTRIBUTE_ID))
                .where(PRODUCT_VARIANT.PRODUCT_ID.eq(productId))
                .orderBy(PRODUCT_VARIANT.ID.asc())
                .fetchInto(ProductVariantRow.class);
    }

    public List<ProductVariantRow> fetchVariantDetailByProductIds(List<Integer> productIds) {

        return dsl.select(
                        PRODUCT_VARIANT.ID,
                        PRODUCT_VARIANT.SKU.as("sku"),
                        PRODUCT_VARIANT.IMAGE.as("image"),
                        PRODUCT_VARIANT.PRICE.as("price"),
                        PRODUCT_VARIANT.ORIGINAL_PRICE.as("original_price"),
                        PRODUCT_VARIANT.STOCK.as("stock"),
                        PRODUCT_VARIANT.PRODUCT_ID.as("product_id"),
                        PRODUCT.NAME.as("product_name"),
                        PRODUCT_VARIANT.CREATED_AT.as("created_at"),
                        PRODUCT_ATTRIBUTE.FIELD_NAME.as("field_name"),
                        ATTRIBUTE_VALUE.VALUE.as("value")
                )
                .from(PRODUCT_VARIANT)
                .leftJoin(PRODUCT).on(PRODUCT.ID.eq(PRODUCT_VARIANT.PRODUCT_ID))
                .join(PRODUCT_VARIANT_ATTRIBUTE)
                .on(PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID.eq(PRODUCT_VARIANT.ID))
                .join(ATTRIBUTE_VALUE)
                .on(ATTRIBUTE_VALUE.ID.eq(PRODUCT_VARIANT_ATTRIBUTE.ATTRIBUTE_VALUE_ID))
                .join(PRODUCT_ATTRIBUTE)
                .on(PRODUCT_ATTRIBUTE.ID.eq(ATTRIBUTE_VALUE.ATTRIBUTE_ID))
                .where(PRODUCT_VARIANT.PRODUCT_ID.in(productIds))
                .orderBy(
                        PRODUCT_VARIANT.PRODUCT_ID.asc(),
                        PRODUCT_VARIANT.ID.asc()
                )
                .fetchInto(ProductVariantRow.class);
    }

    public List<ProductVariantRow> fetchVariantDetailByProductId(Integer productId) {

        return dsl.select(
                        PRODUCT_VARIANT.ID.as("id"),
                        PRODUCT_VARIANT.SKU.as("sku"),
                        PRODUCT_VARIANT.IMAGE.as("image"),
                        PRODUCT_VARIANT.PRICE.as("price"),
                        PRODUCT_VARIANT.ORIGINAL_PRICE.as("original_price"),
                        PRODUCT_VARIANT.STOCK.as("stock"),
                        PRODUCT_VARIANT.PRODUCT_ID.as("product_id"),
                        PRODUCT.NAME.as("product_name"),
                        PRODUCT_VARIANT.CREATED_AT.as("created_at"),
                        PRODUCT_ATTRIBUTE.FIELD_NAME.as("field_name"),
                        ATTRIBUTE_VALUE.VALUE.as("value")
                )
                .from(PRODUCT_VARIANT)
                .leftJoin(PRODUCT).on(PRODUCT.ID.eq(PRODUCT_VARIANT.PRODUCT_ID))
                .join(PRODUCT_VARIANT_ATTRIBUTE)
                .on(PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID.eq(PRODUCT_VARIANT.ID))
                .join(ATTRIBUTE_VALUE)
                .on(ATTRIBUTE_VALUE.ID.eq(PRODUCT_VARIANT_ATTRIBUTE.ATTRIBUTE_VALUE_ID))
                .join(PRODUCT_ATTRIBUTE)
                .on(PRODUCT_ATTRIBUTE.ID.eq(ATTRIBUTE_VALUE.ATTRIBUTE_ID))
                .where(PRODUCT_VARIANT.PRODUCT_ID.eq(productId))
                .orderBy(PRODUCT_VARIANT.ID.asc())
                .fetchInto(ProductVariantRow.class);
    }

    public Long countByCriteria(Integer productId, String keyword) {
        return countBy(getWhereCondition(productId, keyword));
    }

    public ProductVariant getById(Integer id) {
        return dsl.select(
                        withBase(
                                PRODUCT.NAME.as("product_name")
                        )
                )
                .from(PRODUCT_VARIANT)
                .join(PRODUCT)
                .on(PRODUCT.ID.eq(PRODUCT_VARIANT.PRODUCT_ID))
                .where(baseCondition())
                .and(PRODUCT_VARIANT.ID.eq(id))
                .fetchOptionalInto(ProductVariant.class)
                .orElse(null);
    }

    public List<VariantAttributeRow> fetchVariantAttributes(Integer variantId) {

        Field<String> attributeFieldName = PRODUCT_ATTRIBUTE.FIELD_NAME.as("field_name");
        Field<String> attributeValue = ATTRIBUTE_VALUE.VALUE.as("value");

        return dsl.select(attributeFieldName, attributeValue)
                .from(PRODUCT_VARIANT_ATTRIBUTE)
                .join(ATTRIBUTE_VALUE)
                .on(ATTRIBUTE_VALUE.ID.eq(PRODUCT_VARIANT_ATTRIBUTE.ATTRIBUTE_VALUE_ID))
                .join(PRODUCT_ATTRIBUTE)
                .on(PRODUCT_ATTRIBUTE.ID.eq(ATTRIBUTE_VALUE.ATTRIBUTE_ID))
                .where(PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID.eq(variantId))
                .fetchInto(VariantAttributeRow.class);
    }

    public List<ProductVariant> getByIds(List<Integer> ids) {

        return dsl.select(
                        PRODUCT_VARIANT.ID,
                        PRODUCT_VARIANT.PRODUCT_ID,
                        PRODUCT.NAME.as("product_name"),   // JOIN thêm
                        PRODUCT_VARIANT.SKU,
                        PRODUCT_VARIANT.IMAGE,
                        PRODUCT_VARIANT.PRICE,
                        PRODUCT_VARIANT.ORIGINAL_PRICE,
                        PRODUCT_VARIANT.STOCK,
                        PRODUCT_VARIANT.CREATED_AT
                )
                .from(PRODUCT_VARIANT)
                .join(PRODUCT)
                .on(PRODUCT.ID.eq(PRODUCT_VARIANT.PRODUCT_ID))
                .where(PRODUCT_VARIANT.ID.in(ids))
                .fetchInto(ProductVariant.class);
    }

    public List<VariantAttributeRow> fetchVariantAttributesByVariantIds(
            List<Integer> variantIds) {

        return dsl.select(
                        PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID.as("variant_id"),
                        PRODUCT_ATTRIBUTE.FIELD_NAME.as("field_name"),
                        ATTRIBUTE_VALUE.VALUE.as("value")
                )
                .from(PRODUCT_VARIANT_ATTRIBUTE)
                .join(ATTRIBUTE_VALUE)
                .on(ATTRIBUTE_VALUE.ID.eq(PRODUCT_VARIANT_ATTRIBUTE.ATTRIBUTE_VALUE_ID))
                .join(PRODUCT_ATTRIBUTE)
                .on(PRODUCT_ATTRIBUTE.ID.eq(ATTRIBUTE_VALUE.ATTRIBUTE_ID))
                .where(PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID.in(variantIds))
                .fetchInto(VariantAttributeRow.class);
    }

    public boolean existsBySku(String sku) {
        if (sku == null || sku.isBlank()) return false;
        return existsBy(PRODUCT_VARIANT.SKU.eq(sku));
    }

    public List<ProductVariant> getByProductId(Integer productId) {
        return selectManyBy(PRODUCT_VARIANT.PRODUCT_ID.eq(productId), ProductVariant.class);
    }

    /* ============================================================
     *  Mutations
     * ============================================================ */

    public ProductVariant insert(ProductVariant variant) {
        return insertReturning(
                dsl.insertInto(PRODUCT_VARIANT)
                        .set(PRODUCT_VARIANT.PRODUCT_ID, variant.getProductId())
                        .set(PRODUCT_VARIANT.SKU, variant.getSku())
                        .set(PRODUCT_VARIANT.IMAGE, variant.getImage())
                        .set(PRODUCT_VARIANT.PRICE, variant.getPrice())
                        .set(PRODUCT_VARIANT.STOCK, variant.getStock()),
                ProductVariant.class
        );
    }

    public void update(Integer id, ProductVariant variant) {
        updateBy(
                PRODUCT_VARIANT.ID.eq(id),
                fields(
                        PRODUCT_VARIANT.SKU, variant.getSku(),
                        PRODUCT_VARIANT.IMAGE, variant.getImage(),
                        PRODUCT_VARIANT.PRICE, variant.getPrice(),
                        PRODUCT_VARIANT.STOCK, variant.getStock()
                )
        );
    }

    public Integer deleteById(Integer id) {
        return deleteBy(PRODUCT_VARIANT.ID.eq(id));
    }
}