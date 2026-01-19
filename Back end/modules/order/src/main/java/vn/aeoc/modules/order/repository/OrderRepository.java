package vn.aeoc.modules.order.repository;

import static vn.aeoc.packages.infra.jooq.tables.Order.ORDER;

import java.util.List;

import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Repository;

import vn.aeoc.modules.order.constant.OrderStatus;
import vn.aeoc.modules.order.constant.PaymentStatus;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.common.util.CommonUtils;
import vn.aeoc.packages.entity.api.Order;
import vn.aeoc.packages.infra.jooq.config.util.JooqRepositorySupport;
import vn.aeoc.packages.infra.jooq.tables.records.OrderRecord;

@Repository
public class OrderRepository extends JooqRepositorySupport<OrderRecord> {

    public OrderRepository(org.jooq.DSLContext dsl) {
        super(dsl, ORDER);
    }

    @Override
    protected List<Field<?>> baseFields() {
        return List.of(
                ORDER.ID,
                ORDER.CODE,
                ORDER.USER_ID,
                ORDER.TOTAL_AMOUNT,
                ORDER.DISCOUNT_AMOUNT,
                ORDER.FINAL_AMOUNT,
                ORDER.STATUS,
                ORDER.PAYMENT_METHOD,
                ORDER.PAYMENT_STATUS,
                ORDER.NOTE,
                ORDER.ADDRESS,
                ORDER.CREATED_AT,
                ORDER.UPDATED_AT
        );
    }

    @Override
    protected Condition baseCondition() {
        return DSL.trueCondition();
    }

    private Condition getWhereCondition(
            Integer userId,
            String orderStatus,
            String paymentStatus) {

        Condition c = DSL.trueCondition();

        if (userId != null) {
            c = c.and(ORDER.USER_ID.eq(userId));
        }
        if (orderStatus != null && !orderStatus.isBlank()) {
            c = c.and(ORDER.STATUS.eq(orderStatus));
        }
        if (paymentStatus != null && !paymentStatus.isBlank()) {
            c = c.and(ORDER.PAYMENT_STATUS.eq(paymentStatus));
        }

        return c;
    }

    /* ================= Queries ================= */

    public List<Order> getByCriteria(
            Integer userId,
            String orderStatus,
            String paymentStatus,
            Pageable pageable) {

        return selectPage(
                getWhereCondition(userId, orderStatus, paymentStatus),
                pageable,
                Order.class,
                OrderBy.desc(ORDER.ID)
        );
    }

    public Long countByCriteria(
            Integer userId,
            String orderStatus,
            String paymentStatus) {

        return countBy(getWhereCondition(userId, orderStatus, paymentStatus));
    }

    public Order getById(Integer id) {
        return selectOneBy(ORDER.ID.eq(id), Order.class);
    }

    /* ================= Mutations ================= */

    public Order insert(Order o) {

        dsl.insertInto(ORDER)
                .set(ORDER.ID, o.getId())
                .set(ORDER.CODE, CommonUtils.nextCode("ORD"))
                .set(ORDER.USER_ID, o.getUserId())
                .set(ORDER.TOTAL_AMOUNT, o.getTotalAmount())
                .set(ORDER.DISCOUNT_AMOUNT, o.getDiscountAmount())
                .set(ORDER.FINAL_AMOUNT, o.getFinalAmount())
                .set(ORDER.STATUS, OrderStatus.NEW)
                .set(ORDER.PAYMENT_METHOD, o.getPaymentMethod())
                .set(ORDER.PAYMENT_STATUS, PaymentStatus.UNPAID)
                .set(ORDER.ADDRESS, o.getAddress())
                .set(ORDER.NOTE, o.getNote())
                .execute();

        return dsl.selectFrom(ORDER)
                .where(ORDER.ID.eq(o.getId()))
                .fetchOneInto(Order.class);
    }

    public void update(Integer id, Order o) {
        updateBy(
                ORDER.ID.eq(id),
                fields(
                        ORDER.STATUS, o.getStatus(),
                        ORDER.PAYMENT_METHOD, o.getPaymentMethod(),
                        ORDER.PAYMENT_STATUS, o.getStatus(),
                        ORDER.NOTE, o.getNote(),
                        ORDER.UPDATED_AT, DSL.currentTimestamp()
                )
        );
    }

    public void updateStatus(Integer id, Order o) {
        updateBy(
                ORDER.ID.eq(id),
                fields(
                        ORDER.STATUS, o.getStatus(),
                        ORDER.PAYMENT_STATUS, o.getPaymentStatus(),
                        ORDER.UPDATED_AT, DSL.currentTimestamp()
                )
        );
    }
}
