package com.example.ecommerce.repository;

import com.example.ecommerce.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    List<Category> findByParentId(UUID parentId);

    List<Category> findByDepth(int depth);

    List<Category> findByParentIdOrderByDisplayOrderAsc(UUID parentId);
}
