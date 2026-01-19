package vn.aeoc.packages.infra.jooq.config.util;

import java.util.*;
import java.util.concurrent.Callable;

import org.jooq.*;
import org.jooq.Record;
import org.jooq.impl.DSL;

import vn.aeoc.packages.common.paging.Pageable;

@SuppressWarnings({"unchecked", "rawtypes"})
public abstract class JooqRepositorySupport<R extends Record> {

  protected final DSLContext dsl;
  protected final Table<R> table;

  protected JooqRepositorySupport(DSLContext dsl, Table<R> table) {
    this.dsl = dsl;
    this.table = table;
  }

  /* ============================================================
   *  Hooks
   * ============================================================ */

  protected List<Field<?>> baseFields() {
    return List.of();
  }

  protected Condition baseCondition() {
    return DSL.trueCondition();
  }

  protected List<Field<?>> withBase(Field<?>... extra) {
    return FieldsHelper.builder().addAll(baseFields()).addAll(List.of(extra)).build();
  }

  /* ============================================================
   *  Core selects
   * ============================================================ */

  protected SelectConditionStep<Record> selectBase() {
    return (SelectConditionStep<Record>)
        (baseFields().isEmpty() ? dsl.selectFrom(table) : dsl.select(baseFields()).from(table))
            .where(baseCondition());
  }

  protected <T> T selectOneBy(Condition condition, Class<T> type) {
    return selectBase().and(condition).fetchOptionalInto(type).orElse(null);
  }

  protected <T> Optional<T> optionalOneBy(Condition condition, Class<T> type) {
    return selectBase().and(condition).fetchOptionalInto(type);
  }

  protected <T> List<T> selectManyBy(Condition condition, Class<T> type) {
    return selectBase().and(condition).fetchInto(type);
  }

  protected boolean existsBy(Condition condition) {
    return dsl.fetchExists(dsl.selectOne().from(table).where(baseCondition()).and(condition));
  }

  protected long countBy(Condition condition) {
    return dsl.selectCount()
        .from(table)
        .where(baseCondition())
        .and(condition)
        .fetchOne(0, long.class);
  }

  /* ============================================================
   *  Ordering & paging
   * ============================================================ */

  protected <T> List<T> selectPage(
      Condition condition, Pageable pageable, Class<T> type, OrderBy... orderBIES) {

    return selectBase()
        .and(condition)
        .orderBy(toSortFields(orderBIES))
        .limit(pageable.getLimit())
        .offset(pageable.getOffset())
        .fetchInto(type);
  }

  protected <T> List<T> findAllOrdered(Class<T> type, OrderBy... orderBIES) {
    return selectBase().orderBy(toSortFields(orderBIES)).fetchInto(type);
  }

  private SortField<?>[] toSortFields(OrderBy... orderBIES) {
    if (orderBIES == null || orderBIES.length == 0) return new SortField<?>[0];
    return Arrays.stream(orderBIES).map(OrderBy::toSortField).toArray(SortField[]::new);
  }

  /* ============================================================
   *  Mutation helpers
   * ============================================================ */

  protected <R extends Record, T> T insertReturning(InsertReturningStep<R> insert, Class<T> type) {
    return Objects.requireNonNull(insert.returning().fetchOne()).into(type);
  }

  protected int deleteBy(Condition condition) {
    return dsl.deleteFrom(table).where(baseCondition()).and(condition).execute();
  }

  protected int updateBy(Condition condition, Map<? extends Field<?>, ?> values) {
    if (values == null || values.isEmpty()) {
      return 0;
    }

    Iterator<? extends Map.Entry<? extends Field<?>, ?>> it =
        values.entrySet().stream().filter(e -> e.getValue() != null).iterator();

    if (!it.hasNext()) {
      return 0;
    }

    Map.Entry<? extends Field<?>, ?> first = it.next();

    UpdateSetMoreStep<R> update =
        dsl.update(table).set(first.getKey().coerce(Object.class), first.getValue());

    while (it.hasNext()) {
      Map.Entry<? extends Field<?>, ?> e = it.next();
      update = update.set(e.getKey().coerce(Object.class), e.getValue());
    }

    return update.where(baseCondition()).and(condition).execute();
  }

  protected Map<Field<?>, Object> fields(Object... pairs) {
    Map<Field<?>, Object> map = new LinkedHashMap<>();
    for (int i = 0; i < pairs.length; i += 2) {
      map.put((Field<?>) pairs[i], pairs[i + 1]);
    }
    return map;
  }

  /* ============================================================
   *  Transaction helper
   * ============================================================ */

  protected <T> T tx(Callable<T> work) {
    return dsl.transactionResult(
        cfg -> {
          try {
            return work.call();
          } catch (Exception e) {
            throw new RuntimeException(e);
          }
        });
  }

  /* ============================================================
   *  Helper types
   * ============================================================ */

  public static final class OrderBy {

    private final SortField<?> sort;

    private OrderBy(SortField<?> sort) {
      this.sort = sort;
    }

    public static OrderBy asc(Field<?> field) {
      return new OrderBy(field.asc());
    }

    public static OrderBy desc(Field<?> field) {
      return new OrderBy(field.desc());
    }

    public static OrderBy ascNullsLast(Field<?> field) {
      return new OrderBy(field.asc().nullsLast());
    }

    public static OrderBy descNullsLast(Field<?> field) {
      return new OrderBy(field.desc().nullsLast());
    }

    SortField<?> toSortField() {
      return sort;
    }
  }
}
