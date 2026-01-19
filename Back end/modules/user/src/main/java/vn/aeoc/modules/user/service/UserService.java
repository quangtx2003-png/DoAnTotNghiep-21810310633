package vn.aeoc.modules.user.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import vn.aeoc.modules.user.repository.UserRepository;
import vn.aeoc.packages.auth.rbac.config.AppUserService;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.User;

@AllArgsConstructor
@Service
public class UserService implements AppUserService<User> {

    private final UserRepository userRepository;

    public User findById(Integer id) {
        return userRepository.getById(id);
    }

    public Page<User> getByCriteria(String keyword, Pageable pageable) {
        List<User> lst = userRepository.getByCriteria(keyword, pageable);
        Long total = userRepository.countByCriteria(keyword);
        pageable.setTotal(total);
        return new Page<>(pageable, lst);
    }

    public void register(User user) {
        if (userRepository.existsByPhone(user.getPhone())) {
            throw new AppException(ErrorCode.DUPLICATED_USER);
        }
        userRepository.register(user);
    }

    @Override
    public User getAllFieldById(Integer id) {
        return userRepository.getUserAllFieldById(id);
    }

    @Override
    public void updatePassword(Integer userId, String newPassword) {
        userRepository.updatePassword(userId, newPassword);
    }

    public User getByPhone(String phone) {
        return userRepository.getByPhone(phone);
    }

    public User getByEmail(String email) {
        return userRepository.getByEmail(email);
    }

    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    public void updateBasicInfo(Integer id, User user) {
        userRepository.updateBasicInfo(id, user);
    }

    public void setActive(Integer id, Boolean active) {
        userRepository.setActive(id, active);
    }

    public List<User> search(String keyword) {
        if (StringUtils.isBlank(keyword)) {
            return List.of();
        }
        return userRepository.search(keyword);
    }

    public User findForAuthentication(String email, String phone) {
        if (StringUtils.isNotBlank(email)) {
            return userRepository.getByEmail(email);
        }
        if (StringUtils.isNotBlank(phone)) {
            return userRepository.getByPhone(phone);
        }
        throw new AppException(ErrorCode.MISSING_EMAIL_OR_PHONE);
    }
}
