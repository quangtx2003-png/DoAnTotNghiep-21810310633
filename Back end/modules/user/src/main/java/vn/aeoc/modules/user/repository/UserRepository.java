package vn.aeoc.modules.user.repository;

import static vn.aeoc.packages.infra.jooq.tables.User.USER;

import java.util.List;

import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.impl.DSL;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Repository;

import vn.aeoc.packages.common.constant.RoleConstant;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.User;
import vn.aeoc.packages.infra.jooq.config.util.JooqRepositorySupport;
import vn.aeoc.packages.infra.jooq.tables.records.UserRecord;

@Repository
public class UserRepository extends JooqRepositorySupport<UserRecord> {

    public UserRepository(org.jooq.DSLContext dsl) {
        super(dsl, USER);
    }

    @Override
    protected List<Field<?>> baseFields() {
        return List.of(USER.ID, USER.NAME, USER.PHONE, USER.EMAIL, USER.ROLE, USER.ACTIVE);
    }

    @Override
    protected Condition baseCondition() {
        return DSL.trueCondition(); // or USER.ACTIVE.isTrue() if you want soft filter
    }

    private Condition getWhereCondition(String keyword) {
        Condition condition = DSL.trueCondition();

        if (keyword != null && !keyword.isBlank()) {
            String likePattern = "%" + keyword.trim().toLowerCase() + "%";
            condition = condition.and(
                    DSL.lower(USER.NAME).like(likePattern).or(DSL.lower(USER.EMAIL).like(likePattern)).or(DSL.lower(USER.PHONE).like(likePattern)));
        }

        return condition;
    }

    /* ============================================================
     *  Queries
     * ============================================================ */

    public List<User> getByCriteria(String keyword, Pageable pageable) {
        return selectPage(getWhereCondition(keyword), pageable, User.class, OrderBy.desc(USER.ID));
    }

    public Long countByCriteria(String keyword) {
        return countBy(getWhereCondition(keyword));
    }

    public List<User> getAll() {
        return selectManyBy(DSL.trueCondition(), User.class);
    }

    public User getById(Integer id) {
        return selectOneBy(USER.ID.eq(id), User.class);
    }

    public User getUserAllFieldById(Integer id) {
        return dsl.select()
                .from(USER)
                .where(USER.ID.eq(id))
                .fetchOneInto(User.class);
    }

    public boolean existsByPhone(String phone) {
        if (phone == null || phone.isBlank()) return false;
        return existsBy(USER.PHONE.eq(phone));
    }

    public User getByPhone(String phone) {
        if (phone == null || phone.isBlank()) return null;

        return dsl.select(withBase(USER.PASSWORD, USER.PLAIN_PASSWORD)).from(USER).where(baseCondition()).and(USER.PHONE.eq(phone)).fetchOptionalInto(User.class).orElse(null);
    }

    public User getByEmail(String email) {
        if (email == null || email.isBlank()) return null;

        return dsl.select(withBase(USER.PASSWORD, USER.PLAIN_PASSWORD)).from(USER).where(baseCondition()).and(USER.EMAIL.eq(email)).fetchOptionalInto(User.class).orElse(null);
    }

    /* ============================================================
     *  Mutations
     * ============================================================ */

    public Integer deleteById(Integer id) {
        return deleteBy(USER.ID.eq(id));
    }

    public void updateBasicInfo(Integer id, User user) {
        updateBy(
                USER.ID.eq(id), fields(
                        USER.NAME, user.getName(),
                        USER.EMAIL, user.getEmail(),
                        USER.PHONE, user.getPhone()));
    }

    public void updatePassword(Integer id, String password) {
        updateBy(
                USER.ID.eq(id), fields(
                        USER.PASSWORD, BCrypt.hashpw(password, BCrypt.gensalt())));
    }

    public void setActive(Integer id, boolean active) {
        updateBy(USER.ID.eq(id), fields(USER.ACTIVE, active));
    }

    public List<User> search(String keyword) {
        return selectManyBy(
                USER.NAME.likeIgnoreCase("%" + keyword + "%").or(USER.EMAIL.likeIgnoreCase("%" + keyword + "%")).or(USER.PHONE.likeIgnoreCase("%" + keyword + "%")), User.class);
    }

    public User register(User user) {
        return insertReturning(
                dsl.insertInto(USER)
                        .set(USER.NAME, user.getName())
                        .set(USER.PASSWORD, BCrypt.hashpw(user.getPlainPassword(), BCrypt.gensalt()))
                        .set(USER.PHONE, user.getPhone()).set(USER.EMAIL, user.getEmail())
                        .set(USER.ACTIVE, true)
                        .set(USER.ROLE, RoleConstant.USER)
                , User.class);
    }
}
