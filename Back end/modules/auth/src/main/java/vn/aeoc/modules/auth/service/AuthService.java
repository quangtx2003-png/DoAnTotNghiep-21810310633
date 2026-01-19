package vn.aeoc.modules.auth.service;

import static vn.aeoc.packages.auth.rbac.util.SecurityUtils.toSecurityUser;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import org.springframework.transaction.annotation.Transactional;
import vn.aeoc.modules.auth.request.ChangePasswordRequest;
import vn.aeoc.packages.auth.rbac.config.AppUserService;
import vn.aeoc.packages.auth.rbac.config.TokenService;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.model.TokenResponse;
import vn.aeoc.packages.entity.api.User;

@Service
@AllArgsConstructor
public class AuthService {

  private final AppUserService<User> userService;
  private final TokenService tokenService;

  public TokenResponse authenticate(User loginRequest, boolean refresh) {

    User userDb =
        userService.findForAuthentication(loginRequest.getEmail(), loginRequest.getPhone());

    if (userDb == null || !userDb.isActive()) {
      throw new AppException(ErrorCode.INVALID_AUTHENTICATION_INFO);
    }

    if (!refresh && !BCrypt.checkpw(loginRequest.getPlainPassword(), userDb.getPassword())) {
      throw new AppException(ErrorCode.INVALID_AUTHENTICATION_INFO);
    }

    return new TokenResponse(tokenService.generate(toSecurityUser(userDb)));
  }

    @Transactional
    public void changePassword(Integer userId, ChangePasswordRequest request) {

        User userDb = userService.getAllFieldById(userId);
        if (userDb == null) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        // 1. Check old password
        if (!BCrypt.checkpw(request.getOldPassword(), userDb.getPassword())) {
            throw new AppException(ErrorCode.WRONG_PASSWORD);
        }

        // 3. New password must be different
        if (BCrypt.checkpw(request.getNewPassword(), userDb.getPassword())) {
            throw new AppException(ErrorCode.SAME_PASSWORD);
        }


        userService.updatePassword(userId, request.getNewPassword());
    }
}
