package vn.aeoc.modules.order.repository;
import static vn.aeoc.packages.infra.jooq.tables.ProductReview.PRODUCT_REVIEW;

import java.util.List;

import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Repository;

import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.ProductReview;
import vn.aeoc.packages.infra.jooq.config.util.JooqRepositorySupport;
import vn.aeoc.packages.infra.jooq.tables.records.ProductReviewRecord;

@Repository
public class ProductReviewRepository
        extends JooqRepositorySupport<ProductReviewRecord> {

    public ProductReviewRepository(org.jooq.DSLContext dsl) {
        super(dsl, PRODUCT_REVIEW);
    }

    @Override
    protected List<Field<?>> baseFields() {
        return List.of(
                PRODUCT_REVIEW.ID,
                PRODUCT_REVIEW.ORDER_ID,
                PRODUCT_REVIEW.ORDER_ITEM_ID,
                PRODUCT_REVIEW.PRODUCT_ID,
                PRODUCT_REVIEW.PRODUCT_VARIANT_ID,
                PRODUCT_REVIEW.USER_ID,
                PRODUCT_REVIEW.RATING,
                PRODUCT_REVIEW.COMMENT,
                PRODUCT_REVIEW.FILES,
                PRODUCT_REVIEW.CREATED_AT
        );
    }

    @Override
    protected Condition baseCondition() {
        return DSL.trueCondition();
    }

    private Condition getWhereCondition(
            Integer productId,
            Integer productVariantId,
            Integer userId,
            Integer rating) {

        Condition c = DSL.trueCondition();

        if (productId != null) {
            c = c.and(PRODUCT_REVIEW.PRODUCT_ID.eq(productId));
        }
        if (productVariantId != null) {
            c = c.and(PRODUCT_REVIEW.PRODUCT_VARIANT_ID.eq(productVariantId));
        }
        if (userId != null) {
            c = c.and(PRODUCT_REVIEW.USER_ID.eq(userId));
        }
        if (rating != null) {
            c = c.and(PRODUCT_REVIEW.RATING.eq(rating));
        }

        return c;
    }

    /* ================= Queries ================= */

    public List<ProductReview> getByCriteria(
            Integer productId,
            Integer productVariantId,
            Integer userId,
            Integer rating,
            Pageable pageable) {

        return selectPage(
                getWhereCondition(productId, productVariantId, userId, rating),
                pageable,
                ProductReview.class,
                OrderBy.desc(PRODUCT_REVIEW.CREATED_AT)
        );
    }

    public Long countByCriteria(
            Integer productId,
            Integer productVariantId,
            Integer userId,
            Integer rating) {

        return countBy(getWhereCondition(productId, productVariantId, userId, rating));
    }

    public boolean existsByOrderItem(Integer orderItemId) {
        return existsBy(PRODUCT_REVIEW.ORDER_ITEM_ID.eq(orderItemId));
    }

    public ProductReview getById(Integer id) {
        return selectOneBy(PRODUCT_REVIEW.ID.eq(id), ProductReview.class);
    }

    public void deleteById(Integer id) {
        dsl.deleteFrom(PRODUCT_REVIEW)
                .where(PRODUCT_REVIEW.ID.eq(id))
                .execute();
    }

    /* ================= Mutations ================= */

    public ProductReview insert(ProductReview r) {
        return insertReturning(
                dsl.insertInto(PRODUCT_REVIEW)
                        .set(PRODUCT_REVIEW.ORDER_ID, r.getOrderId())
                        .set(PRODUCT_REVIEW.ORDER_ITEM_ID, r.getOrderItemId())
                        .set(PRODUCT_REVIEW.PRODUCT_ID, r.getProductId())
                        .set(PRODUCT_REVIEW.PRODUCT_VARIANT_ID, r.getProductVariantId())
                        .set(PRODUCT_REVIEW.USER_ID, r.getUserId())
                        .set(PRODUCT_REVIEW.RATING, r.getRating())
                        .set(PRODUCT_REVIEW.COMMENT, r.getComment())
                        .set(PRODUCT_REVIEW.FILES, r.getFiles()),
                ProductReview.class
        );
    }

    public Float calculateAvgRatingByProductVariant(Integer productId) {
        return dsl.select(DSL.avg(PRODUCT_REVIEW.RATING))
                .from(PRODUCT_REVIEW)
                .where(PRODUCT_REVIEW.PRODUCT_ID.eq(productId))
                .fetchOneInto(Float.class);
    }
}
