package vn.aeoc.packages.auth.rbac.model;

public interface AppUser {
    Integer getId();

    String getUsername();

    String getName();

    String getRole();

    boolean isActive();
}
