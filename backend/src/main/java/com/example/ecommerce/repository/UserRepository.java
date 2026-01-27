package com.example.ecommerce.repository;

import com.example.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);

    Optional<User> findByRepresentativePhone(String representativePhone);

    boolean existsByUsername(String username);

    boolean existsByRepresentativePhone(String representativePhone);
}
