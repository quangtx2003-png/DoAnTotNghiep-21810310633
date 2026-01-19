package vn.aeoc.modules.product.repository;

import static vn.aeoc.packages.infra.jooq.tables.ProductVariantAttribute.PRODUCT_VARIANT_ATTRIBUTE;

import java.util.List;

import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Repository;

import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductVariantAttribute;
import vn.aeoc.packages.infra.jooq.config.util.JooqRepositorySupport;
import vn.aeoc.packages.infra.jooq.tables.records.ProductVariantAttributeRecord;

@Repository
public class ProductVariantAttributeRepository
        extends JooqRepositorySupport<ProductVariantAttributeRecord> {

    public ProductVariantAttributeRepository(org.jooq.DSLContext dsl) {
        super(dsl, PRODUCT_VARIANT_ATTRIBUTE);
    }

    @Override
    protected List<Field<?>> baseFields() {
        return List.of(
                PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID,
                PRODUCT_VARIANT_ATTRIBUTE.ATTRIBUTE_VALUE_ID
        );
    }

    @Override
    protected Condition baseCondition() {
        return DSL.trueCondition();
    }

    private Condition getWhereCondition(
            Integer variantId,
            Integer attributeValueId) {

        Condition condition = DSL.trueCondition();

        if (variantId != null) {
            condition = condition.and(
                    PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID.eq(variantId));
        }

        if (attributeValueId != null) {
            condition = condition.and(
                    PRODUCT_VARIANT_ATTRIBUTE.ATTRIBUTE_VALUE_ID.eq(attributeValueId));
        }

        return condition;
    }

    /* ============================================================
     *  Queries
     * ============================================================ */

    public List<ProductVariantAttribute> getByCriteria(
            Integer variantId,
            Integer attributeValueId,
            Pageable pageable) {

        return selectPage(
                getWhereCondition(variantId, attributeValueId),
                pageable,
                ProductVariantAttribute.class,
                OrderBy.desc(PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID)
        );
    }

    public Long countByCriteria(
            Integer variantId,
            Integer attributeValueId) {

        return countBy(getWhereCondition(variantId, attributeValueId));
    }

    public List<ProductVariantAttribute> getByVariantId(Integer variantId) {
        return selectManyBy(
                PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID.eq(variantId),
                ProductVariantAttribute.class
        );
    }

    public boolean exists(Integer variantId, Integer attributeValueId) {
        if (variantId == null || attributeValueId == null) return false;

        return existsBy(
                PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID.eq(variantId)
                        .and(PRODUCT_VARIANT_ATTRIBUTE.ATTRIBUTE_VALUE_ID.eq(attributeValueId))
        );
    }

    /* ============================================================
     *  Mutations
     * ============================================================ */

    public void insert(ProductVariantAttribute pva) {
        dsl.insertInto(PRODUCT_VARIANT_ATTRIBUTE)
                .set(PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID, pva.getVariantId())
                .set(PRODUCT_VARIANT_ATTRIBUTE.ATTRIBUTE_VALUE_ID, pva.getAttributeValueId())
                .execute();
    }

    public Integer delete(Integer variantId, Integer attributeValueId) {
        return deleteBy(
                PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID.eq(variantId)
                        .and(PRODUCT_VARIANT_ATTRIBUTE.ATTRIBUTE_VALUE_ID.eq(attributeValueId))
        );
    }

    public Integer deleteByVariantId(Integer variantId) {
        return deleteBy(PRODUCT_VARIANT_ATTRIBUTE.VARIANT_ID.eq(variantId));
    }
}
