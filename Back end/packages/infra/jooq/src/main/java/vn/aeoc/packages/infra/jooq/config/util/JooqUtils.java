package vn.aeoc.packages.infra.jooq.config.util;

import org.apache.commons.lang3.StringUtils;
import org.jooq.JSON;
import org.jooq.exception.DataException;

public class JooqUtils {
  /**
   * Lấy về kiểu JSONB trong postgresql
   *
   * @param jsonString
   * @return
   */
  public static JSON getJSON(String jsonString) {
    if (StringUtils.isBlank(jsonString)) {
      return null;
    }

    try {
      JSON jsonData = JSON.valueOf(jsonString);
      return jsonData;
    } catch (DataException e) {
      System.err.println("Chuỗi JSON không hợp lệ: " + e.getMessage());
      return null;
    }
  }
}
