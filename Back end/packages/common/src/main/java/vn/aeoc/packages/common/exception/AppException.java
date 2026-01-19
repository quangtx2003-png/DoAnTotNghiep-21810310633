package vn.aeoc.packages.common.exception;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

import vn.aeoc.packages.common.constant.ErrorCode;

public class AppException extends RuntimeException {
    protected int statusCode = INTERNAL_SERVER_ERROR.value();

    public AppException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.statusCode = errorCode.getCode();
    }

    public AppException(String message) {
        super(message);
    }

    public int getStatusCode() {
        return statusCode;
    }
}
