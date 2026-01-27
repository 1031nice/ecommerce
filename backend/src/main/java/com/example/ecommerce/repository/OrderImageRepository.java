package com.example.ecommerce.repository;

import com.example.ecommerce.entity.OrderImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface OrderImageRepository extends JpaRepository<OrderImage, UUID> {
    List<OrderImage> findByOrderId(UUID orderId);
}
