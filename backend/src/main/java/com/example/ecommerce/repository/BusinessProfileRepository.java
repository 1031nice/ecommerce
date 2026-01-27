package com.example.ecommerce.repository;

import com.example.ecommerce.entity.BusinessProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface BusinessProfileRepository extends JpaRepository<BusinessProfile, UUID> {
    List<BusinessProfile> findByUserId(UUID userId);

    boolean existsByBusinessNumber(String businessNumber);
}
