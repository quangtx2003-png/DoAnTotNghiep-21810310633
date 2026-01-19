package vn.aeoc.modules.order.repository;

import static vn.aeoc.packages.infra.jooq.tables.OrderItem.ORDER_ITEM;
import static vn.aeoc.packages.infra.jooq.tables.Product.PRODUCT;
import static vn.aeoc.packages.infra.jooq.tables.ProductVariant.PRODUCT_VARIANT;

import java.util.List;

import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Repository;

import vn.aeoc.packages.entity.api.OrderItem;
import vn.aeoc.packages.infra.jooq.config.util.JooqRepositorySupport;
import vn.aeoc.packages.infra.jooq.tables.records.OrderItemRecord;

@Repository
public class OrderItemRepository
        extends JooqRepositorySupport<OrderItemRecord> {

    public OrderItemRepository(org.jooq.DSLContext dsl) {
        super(dsl, ORDER_ITEM);
    }

    @Override
    protected List<Field<?>> baseFields() {
        return List.of(
                ORDER_ITEM.ID,
                ORDER_ITEM.ORDER_ID,
                ORDER_ITEM.PRODUCT_ID,
                ORDER_ITEM.PRODUCT_VARIANT_ID,
                ORDER_ITEM.PRICE,
                ORDER_ITEM.QUANTITY,
                ORDER_ITEM.TOTAL_PRICE
        );
    }

    @Override
    protected Condition baseCondition() {
        return DSL.trueCondition();
    }

    public List<OrderItem> getByOrderId(Integer orderId) {
        return selectManyBy(
                ORDER_ITEM.ORDER_ID.eq(orderId),
                OrderItem.class
        );
    }

    /* ================= Mutations ================= */

    public OrderItem insert(OrderItem item) {
        return insertReturning(
                dsl.insertInto(ORDER_ITEM)
                        .set(ORDER_ITEM.ORDER_ID, item.getOrderId())
                        .set(ORDER_ITEM.PRODUCT_ID, item.getProductId())
                        .set(ORDER_ITEM.PRODUCT_VARIANT_ID, item.getProductVariantId())
                        .set(ORDER_ITEM.PRICE, item.getPrice())
                        .set(ORDER_ITEM.QUANTITY, item.getQuantity())
                        .set(ORDER_ITEM.TOTAL_PRICE, item.getTotalPrice()),
                OrderItem.class
        );
    }

    public void insertMany(List<OrderItem> items) {

        if (items == null || items.isEmpty()) {
            return;
        }

        dsl.batch(
                items.stream()
                        .map(item ->
                                dsl.insertInto(ORDER_ITEM)
                                        .set(ORDER_ITEM.ORDER_ID, item.getOrderId())
                                        .set(ORDER_ITEM.PRODUCT_ID, item.getProductId())
                                        .set(ORDER_ITEM.PRODUCT_VARIANT_ID, item.getProductVariantId())
                                        .set(ORDER_ITEM.PRICE, item.getPrice())
                                        .set(ORDER_ITEM.QUANTITY, item.getQuantity())
                                        .set(ORDER_ITEM.TOTAL_PRICE, item.getTotalPrice())
                        )
                        .toList()
        ).execute();
    }

    public List<OrderItem> fetchOrderItemDetail(Integer orderId) {

        return dsl.select(
                        ORDER_ITEM.ID,

                        PRODUCT.ID.as("product_id"),
                        PRODUCT.NAME.as("product_name"),

                        PRODUCT_VARIANT.ID.as("product_variant_id"),
                        PRODUCT_VARIANT.SKU.as("sku"),
                        PRODUCT_VARIANT.IMAGE.as("product_variant_image"),

                        ORDER_ITEM.PRICE,
                        ORDER_ITEM.QUANTITY,
                        ORDER_ITEM.TOTAL_PRICE
                )
                .from(ORDER_ITEM)
                .join(PRODUCT_VARIANT)
                .on(PRODUCT_VARIANT.ID.eq(ORDER_ITEM.PRODUCT_VARIANT_ID))
                .join(PRODUCT)
                .on(PRODUCT.ID.eq(PRODUCT_VARIANT.PRODUCT_ID))
                .where(ORDER_ITEM.ORDER_ID.eq(orderId))
                .orderBy(ORDER_ITEM.ID.asc())
                .fetchInto(OrderItem.class);
    }

    public Integer deleteByOrderId(Integer orderId) {
        return deleteBy(ORDER_ITEM.ORDER_ID.eq(orderId));
    }
}
