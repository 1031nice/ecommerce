package com.example.ecommerce.repository;

import com.example.ecommerce.entity.DeliveryAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface DeliveryAddressRepository extends JpaRepository<DeliveryAddress, UUID> {
    List<DeliveryAddress> findByUserId(UUID userId);
}
