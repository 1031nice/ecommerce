package com.example.ecommerce.repository;

import com.example.ecommerce.entity.CommonCode;
import com.example.ecommerce.entity.CommonCodeId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommonCodeRepository extends JpaRepository<CommonCode, CommonCodeId> {
    List<CommonCode> findByCodeTypeAndIsActiveTrueOrderByDisplayOrderAsc(String codeType);
}
