package vn.aeoc.modules.product.repository;

import static vn.aeoc.packages.infra.jooq.tables.Category.CATEGORY;

import java.util.List;

import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Repository;

import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.Category;
import vn.aeoc.packages.infra.jooq.config.util.JooqRepositorySupport;
import vn.aeoc.packages.infra.jooq.tables.records.CategoryRecord;

@Repository
public class CategoryRepository extends JooqRepositorySupport<CategoryRecord> {

    public CategoryRepository(org.jooq.DSLContext dsl) {
        super(dsl, CATEGORY);
    }

    @Override
    protected List<Field<?>> baseFields() {
        return List.of(
                CATEGORY.ID,
                CATEGORY.NAME,
                CATEGORY.DESCRIPTION
        );
    }

    @Override
    protected Condition baseCondition() {
        return DSL.trueCondition();
    }

    private Condition getWhereCondition(String keyword) {
        Condition condition = DSL.trueCondition();

        if (keyword != null && !keyword.isBlank()) {
            condition = condition.and(
                    CATEGORY.NAME.likeIgnoreCase("%" + keyword.trim() + "%")
            );
        }

        return condition;
    }

    /* ============================================================
     *  Queries
     * ============================================================ */

    public List<Category> getByCriteria(String keyword, Pageable pageable) {
        return selectPage(
                getWhereCondition(keyword),
                pageable,
                Category.class,
                OrderBy.desc(CATEGORY.ID)
        );
    }

    public Long countByCriteria(String keyword) {
        return countBy(getWhereCondition(keyword));
    }

    public Category getById(Integer id) {
        return selectOneBy(CATEGORY.ID.eq(id), Category.class);
    }

    public boolean existsByName(String name) {
        if (name == null || name.isBlank()) return false;
        return existsBy(CATEGORY.NAME.eq(name.trim()));
    }

    /* ============================================================
     *  Mutations
     * ============================================================ */

    public Category insert(Category category) {
        return insertReturning(
                dsl.insertInto(CATEGORY)
                        .set(CATEGORY.NAME, category.getName())
                        .set(CATEGORY.DESCRIPTION, category.getDescription()),
                Category.class
        );
    }

    public void update(Integer id, Category category) {
        updateBy(
                CATEGORY.ID.eq(id),
                fields(
                        CATEGORY.NAME, category.getName(),
                        CATEGORY.DESCRIPTION, category.getDescription()
                )
        );
    }

    public Integer deleteById(Integer id) {
        return deleteBy(CATEGORY.ID.eq(id));
    }
}
