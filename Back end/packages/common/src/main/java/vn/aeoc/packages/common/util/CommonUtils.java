package vn.aeoc.packages.common.util;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class CommonUtils {
    public static Float NVL(Float l) {
        return NVL(l, 0f);
    }

    public static Long NVL(Long l) {
        return NVL(l, 0l);
    }

    public static Double NVL(Double l) {
        return NVL(l, 0.0);
    }

    public static Long NVL(Long l, Long defaultVal) {
        return (l == null ? defaultVal : l);
    }

    public static Integer NVL(Integer t) {
        return NVL(t, 0);
    }

    public static Integer NVL(Integer t, Integer defaultVal) {
        return (t == null ? defaultVal : t);
    }

    public static Double NVL(Double t, Double defaultVal) {
        return (t == null ? defaultVal : t);
    }

    public static <T> T NVL(T t, T defaultVal) {
        return (t == null ? defaultVal : t);
    }

    private static final Map<String, Integer> runningCodes = new ConcurrentHashMap<>();
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyyMMdd");

//    /** Sinh mã code dạng PREFIX + yyyyMMdd + - + 6 số tăng dần Ví dụ: INV20250203-000001 */
//    public static synchronized String nextCode(String prefix) {
//        String today = LocalDate.now().format(DATE_FORMAT);
//
//        // Key theo ngày + prefix riêng
//        String key = prefix + today;
//
//        // Lấy số tăng dần
//        Integer current = runningCodes.getOrDefault(key, 0);
//        current++;
//        runningCodes.put(key, current);
//
//        return prefix + today + "-" + String.format("%06d", current);
//    }

    public static String nextCode(String prefix) {
        String today = LocalDate.now().format(DATE_FORMAT);

        // 6 ký tự random (0-9A-Z)
        String random = UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 6)
                .toUpperCase();

        return prefix + today + "-" + random;
    }

    public static String NVL(String l) {
        if (StringUtils.isBlank(l)) {
            return "";
        }

        return l.trim();
    }

    public static String NVL(String l, String defaultVal) {
        return l == null ? defaultVal : l.trim();
    }

    public static String hmacSHA256(String data, String key) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKey);
            byte[] rawHmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(rawHmac);
        } catch (Exception e) {
            throw new RuntimeException("Create signature failed", e);
        }
    }

    // 1,2,3,4 -> ["1","2","3","4"]
    public static String formatArrayListToJson(String list) {
        if (list == null || list.isBlank()) {
            return "[]";
        }

        String result = Arrays.stream(list.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(s -> "\"" + s + "\"")
                .collect(Collectors.joining(","));

        return "[" + result + "]";
    }
}
