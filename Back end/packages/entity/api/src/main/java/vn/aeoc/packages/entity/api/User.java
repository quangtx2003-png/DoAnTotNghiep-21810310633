package vn.aeoc.packages.entity.api;

import lombok.Getter;
import lombok.Setter;

import vn.aeoc.packages.auth.rbac.model.AppUser;

@Getter
@Setter
public class User implements AppUser {
    private Integer id;

    private String name;

    private String phone;

    private String password;

    private String plainPassword;

    private String email;

    private String role;

    private boolean active;

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getUsername() {
        return phone != null ? phone : (email != null ? email : "");
    }

    @Override
    public String getRole() {
        return role;
    }

    @Override
    public boolean isActive() {
        return active;
    }
}
