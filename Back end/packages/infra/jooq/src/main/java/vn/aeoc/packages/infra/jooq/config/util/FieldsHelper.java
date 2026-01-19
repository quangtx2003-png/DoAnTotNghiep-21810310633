package vn.aeoc.packages.infra.jooq.config.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.jooq.Field;

public class FieldsHelper {

  private final List<Field<?>> fields = new ArrayList<>();

  public static FieldsHelper builder() {
    return new FieldsHelper();
  }

  public FieldsHelper add(Field<?> field) {
    fields.add(field);
    return this;
  }

  public FieldsHelper addAll(List<Field<?>> fieldList) {
    fields.addAll(fieldList);
    return this;
  }

  public List<Field<?>> build() {
    return Arrays.stream(fields.toArray(new Field<?>[0])).toList();
  }
}
