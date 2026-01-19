package vn.aeoc.modules.product.service;

import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import vn.aeoc.modules.product.repository.CategoryRepository;
import vn.aeoc.packages.common.constant.ErrorCode;
import vn.aeoc.packages.common.exception.AppException;
import vn.aeoc.packages.common.paging.Page;
import vn.aeoc.packages.common.paging.Pageable;
import vn.aeoc.packages.entity.api.Category;

@AllArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository repository;

    public Category getById(Integer id) {
        return repository.getById(id);
    }

    public Page<Category> getByCriteria(String keyword, Pageable pageable) {
        List<Category> list = repository.getByCriteria(keyword, pageable);
        Long total = repository.countByCriteria(keyword);

        pageable.setTotal(total);
        return new Page<>(pageable, list);
    }

    public void create(Category category) {
        if (repository.existsByName(category.getName())) {
            throw new AppException(ErrorCode.DUPLICATED_DATA);
        }
        repository.insert(category);
    }

    public void update(Integer id, Category category) {
        repository.update(id, category);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
