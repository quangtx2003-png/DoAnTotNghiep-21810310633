package vn.aeoc.modules.product.repository;

import static vn.aeoc.packages.infra.jooq.tables.ProductAttribute.PRODUCT_ATTRIBUTE;

import java.util.List;

import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Repository;

import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductAttribute;
import vn.aeoc.packages.infra.jooq.config.util.JooqRepositorySupport;
import vn.aeoc.packages.infra.jooq.tables.records.ProductAttributeRecord;

@Repository
public class ProductAttributeRepository
        extends JooqRepositorySupport<ProductAttributeRecord> {

    public ProductAttributeRepository(org.jooq.DSLContext dsl) {
        super(dsl, PRODUCT_ATTRIBUTE);
    }

    @Override
    protected List<Field<?>> baseFields() {
        return List.of(
                PRODUCT_ATTRIBUTE.ID,
                PRODUCT_ATTRIBUTE.FIELD_NAME,
                PRODUCT_ATTRIBUTE.NAME,
                PRODUCT_ATTRIBUTE.PRODUCT_ID
        );
    }

    @Override
    protected Condition baseCondition() {
        return DSL.trueCondition();
    }

    private Condition getWhereCondition(
            Integer productId,
            String keyword) {

        Condition condition = DSL.trueCondition();

        if (productId != null) {
            condition = condition.and(
                    PRODUCT_ATTRIBUTE.PRODUCT_ID.eq(productId));
        }

        if (keyword != null && !keyword.isBlank()) {
            String like = "%" + keyword.trim() + "%";
            condition = condition.and(
                    PRODUCT_ATTRIBUTE.NAME.likeIgnoreCase(like)
                            .or(PRODUCT_ATTRIBUTE.FIELD_NAME.likeIgnoreCase(like))
            );
        }

        return condition;
    }

    /* ============================================================
     *  Queries
     * ============================================================ */

    public List<ProductAttribute> getByCriteria(
            Integer productId,
            String keyword,
            Pageable pageable) {

        return selectPage(
                getWhereCondition(productId, keyword),
                pageable,
                ProductAttribute.class,
                OrderBy.desc(PRODUCT_ATTRIBUTE.ID)
        );
    }

    public Long countByCriteria(
            Integer productId,
            String keyword) {

        return countBy(getWhereCondition(productId, keyword));
    }

    public ProductAttribute getById(Integer id) {
        return selectOneBy(
                PRODUCT_ATTRIBUTE.ID.eq(id),
                ProductAttribute.class
        );
    }

    public List<ProductAttribute> getByProductId(Integer productId) {
        return selectManyBy(
                PRODUCT_ATTRIBUTE.PRODUCT_ID.eq(productId),
                ProductAttribute.class
        );
    }

    public boolean existsByFieldName(
            Integer productId,
            String fieldName) {

        if (productId == null || fieldName == null || fieldName.isBlank()) {
            return false;
        }

        return existsBy(
                PRODUCT_ATTRIBUTE.PRODUCT_ID.eq(productId)
                        .and(PRODUCT_ATTRIBUTE.FIELD_NAME.eq(fieldName.trim()))
        );
    }

    /* ============================================================
     *  Mutations
     * ============================================================ */

    public ProductAttribute insert(ProductAttribute attr) {
        return insertReturning(
                dsl.insertInto(PRODUCT_ATTRIBUTE)
                        .set(PRODUCT_ATTRIBUTE.FIELD_NAME, attr.getFieldName())
                        .set(PRODUCT_ATTRIBUTE.NAME, attr.getName())
                        .set(PRODUCT_ATTRIBUTE.PRODUCT_ID, attr.getProductId()),
                ProductAttribute.class
        );
    }

    public void update(Integer id, ProductAttribute attr) {
        updateBy(
                PRODUCT_ATTRIBUTE.ID.eq(id),
                fields(
                        PRODUCT_ATTRIBUTE.FIELD_NAME, attr.getFieldName(),
                        PRODUCT_ATTRIBUTE.NAME, attr.getName()
                )
        );
    }

    public Integer deleteById(Integer id) {
        return deleteBy(PRODUCT_ATTRIBUTE.ID.eq(id));
    }
}
