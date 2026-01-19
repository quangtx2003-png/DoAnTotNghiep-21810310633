package vn.aeoc.modules.product.repository;
import static vn.aeoc.packages.infra.jooq.tables.AttributeValue.ATTRIBUTE_VALUE;
import java.util.List;

import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Repository;

import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.AttributeValue;
import vn.aeoc.packages.infra.jooq.config.util.JooqRepositorySupport;
import vn.aeoc.packages.infra.jooq.tables.records.AttributeValueRecord;

@Repository
public class AttributeValueRepository
        extends JooqRepositorySupport<AttributeValueRecord> {

    public AttributeValueRepository(org.jooq.DSLContext dsl) {
        super(dsl, ATTRIBUTE_VALUE);
    }

    @Override
    protected List<Field<?>> baseFields() {
        return List.of(
                ATTRIBUTE_VALUE.ID,
                ATTRIBUTE_VALUE.ATTRIBUTE_ID,
                ATTRIBUTE_VALUE.VALUE
        );
    }

    @Override
    protected Condition baseCondition() {
        return DSL.trueCondition();
    }

    private Condition getWhereCondition(
            Integer attributeId,
            String keyword) {

        Condition condition = DSL.trueCondition();

        if (attributeId != null) {
            condition = condition.and(
                    ATTRIBUTE_VALUE.ATTRIBUTE_ID.eq(attributeId));
        }

        if (keyword != null && !keyword.isBlank()) {
            condition = condition.and(
                    ATTRIBUTE_VALUE.VALUE.likeIgnoreCase(
                            "%" + keyword.trim() + "%"));
        }

        return condition;
    }

    /* ============================================================
     *  Queries
     * ============================================================ */

    public List<AttributeValue> getByCriteria(
            Integer attributeId,
            String keyword,
            Pageable pageable) {

        return selectPage(
                getWhereCondition(attributeId, keyword),
                pageable,
                AttributeValue.class,
                OrderBy.desc(ATTRIBUTE_VALUE.ID)
        );
    }

    public Long countByCriteria(
            Integer attributeId,
            String keyword) {

        return countBy(getWhereCondition(attributeId, keyword));
    }

    public AttributeValue getById(Integer id) {
        return selectOneBy(
                ATTRIBUTE_VALUE.ID.eq(id),
                AttributeValue.class
        );
    }

    public List<AttributeValue> getByAttributeId(Integer attributeId) {
        return selectManyBy(
                ATTRIBUTE_VALUE.ATTRIBUTE_ID.eq(attributeId),
                AttributeValue.class
        );
    }

    public boolean existsByValue(
            Integer attributeId,
            String value) {

        if (attributeId == null || value == null || value.isBlank()) {
            return false;
        }

        return existsBy(
                ATTRIBUTE_VALUE.ATTRIBUTE_ID.eq(attributeId)
                        .and(ATTRIBUTE_VALUE.VALUE.eq(value.trim()))
        );
    }

    /* ============================================================
     *  Mutations
     * ============================================================ */

    public AttributeValue insert(AttributeValue val) {
        return insertReturning(
                dsl.insertInto(ATTRIBUTE_VALUE)
                        .set(ATTRIBUTE_VALUE.ATTRIBUTE_ID, val.getAttributeId())
                        .set(ATTRIBUTE_VALUE.VALUE, val.getValue()),
                AttributeValue.class
        );
    }

    public void update(Integer id, AttributeValue val) {
        updateBy(
                ATTRIBUTE_VALUE.ID.eq(id),
                fields(
                        ATTRIBUTE_VALUE.VALUE, val.getValue()
                )
        );
    }

    public Integer deleteById(Integer id) {
        return deleteBy(ATTRIBUTE_VALUE.ID.eq(id));
    }
}
