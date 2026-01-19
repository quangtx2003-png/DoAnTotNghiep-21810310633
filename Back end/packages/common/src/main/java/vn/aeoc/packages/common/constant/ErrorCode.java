package vn.aeoc.packages.common.constant;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNAUTHORIZED(401, "Token không hợp lệ"),
    TOKEN_EXPIRED(401, "Token đã hết hạn"),
    FORBIDDEN(403, "Không có quyền truy cập"),
    LOCK_ACCOUNT(403, "Tài khoản bị khóa"),
    INTERNAL_ERROR(500, "Lỗi hệ thống"),

    DUPLICATED_USER(400, "Số điện thoại tạo tài khoản đã tồn tại trong hệ thống"),
    DUPLICATED_DATA(400, "Trùng dữ liệu"),
    DATA_NOT_FOUND(404, "Dữ liệu không tồn tại"),
    INPUT_WRONG(400, "Dữ liệu đầu vào không hợp lệ"),
    SAME_PASSWORD(400, "Mật khẩu mới và cũ giống nhau"),
    WRONG_PASSWORD(400, "Mật khẩu không hợp lệ"),
    INVALID_DATA(400, "Dữ liệu không hợp lệ"),
    INVALID_AUTHENTICATION_INFO(400, "Tài khoản hoặc mật khẩu không đúng."),
    DUPLICATED_EMAIL(400, "Email tạo tài khoản đã tồn tại"),
    UPLOAD_FILE_FAILED(400, "Upload file thất bại"),
    INVALID_ORDER_STATUS(400, "Trạng thái đơn hàng không hợp lệ"),
    INVALID_PAYMENT_STATUS(400, "Trạng thái thanh toán không hợp lệ"),
    ORDER_ALREADY_FINISHED(400, "Đơn hàng đã hoàn tất, không thể thao tác thêm"),


    WRONG_LOGIN_INFO(400, "Sai thông tin đăng nhập. Kiểm tra lại tài khoản hoặc mật khẩu!"),
    MISSING_PASSWORD(400, "Chưa nhập mật khẩu!"),
    MISSING_EMAIL_OR_PHONE(400, "Chưa nhập email hoặc số điện thoại!"),
    REGISTRATION_DISABLED(403, "Hệ thống không mở đăng ký"),
    ;

    public final int code;
    public final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
