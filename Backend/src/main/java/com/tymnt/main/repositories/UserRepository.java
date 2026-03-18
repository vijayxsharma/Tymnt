package com.tymnt.main.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tymnt.main.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    User findByEmail(String email); // ✅ FIXED
}
