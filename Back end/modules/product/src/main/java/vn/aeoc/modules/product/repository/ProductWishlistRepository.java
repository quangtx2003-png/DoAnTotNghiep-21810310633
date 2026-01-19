package vn.aeoc.modules.product.repository;

import static vn.aeoc.packages.infra.jooq.tables.ProductWishlist.PRODUCT_WISHLIST;

import java.util.List;

import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Repository;

import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductWishlist;
import vn.aeoc.packages.infra.jooq.config.util.JooqRepositorySupport;
import vn.aeoc.packages.infra.jooq.tables.records.ProductWishlistRecord;

@Repository
public class ProductWishlistRepository
        extends JooqRepositorySupport<ProductWishlistRecord> {

    public ProductWishlistRepository(org.jooq.DSLContext dsl) {
        super(dsl, PRODUCT_WISHLIST);
    }

    @Override
    protected List<Field<?>> baseFields() {
        return List.of(
                PRODUCT_WISHLIST.USER_ID,
                PRODUCT_WISHLIST.PRODUCT_ID,
                PRODUCT_WISHLIST.CREATED_AT
        );
    }

    @Override
    protected Condition baseCondition() {
        return DSL.trueCondition();
    }

    private Condition getWhereCondition(
            Integer userId,
            Integer productId) {

        Condition condition = DSL.trueCondition();

        if (userId != null) {
            condition = condition.and(PRODUCT_WISHLIST.USER_ID.eq(userId));
        }

        if (productId != null) {
            condition = condition.and(PRODUCT_WISHLIST.PRODUCT_ID.eq(productId));
        }

        return condition;
    }

    /* ============================================================
     *  Queries
     * ============================================================ */

    public List<ProductWishlist> getByCriteria(
            Integer userId,
            Integer productId,
            Pageable pageable) {

        return selectPage(
                getWhereCondition(userId, productId),
                pageable,
                ProductWishlist.class,
                OrderBy.desc(PRODUCT_WISHLIST.CREATED_AT)
        );
    }

    public Long countByCriteria(
            Integer userId,
            Integer productId) {

        return countBy(getWhereCondition(userId, productId));
    }

    public List<ProductWishlist> getByUserId(Integer userId) {
        return selectManyBy(
                PRODUCT_WISHLIST.USER_ID.eq(userId),
                ProductWishlist.class
        );
    }

    public boolean exists(Integer userId, Integer productId) {
        if (userId == null || productId == null) return false;

        return existsBy(
                PRODUCT_WISHLIST.USER_ID.eq(userId)
                        .and(PRODUCT_WISHLIST.PRODUCT_ID.eq(productId))
        );
    }

    /* ============================================================
     *  Mutations
     * ============================================================ */

    public void insert(Integer userId, Integer productId) {
        dsl.insertInto(PRODUCT_WISHLIST)
                .set(PRODUCT_WISHLIST.USER_ID, userId)
                .set(PRODUCT_WISHLIST.PRODUCT_ID, productId)
                .execute();
    }

    public Integer delete(Integer userId, Integer productId) {
        return deleteBy(
                PRODUCT_WISHLIST.USER_ID.eq(userId)
                        .and(PRODUCT_WISHLIST.PRODUCT_ID.eq(productId))
        );
    }

    public Integer deleteByUserId(Integer userId) {
        return deleteBy(PRODUCT_WISHLIST.USER_ID.eq(userId));
    }
}
