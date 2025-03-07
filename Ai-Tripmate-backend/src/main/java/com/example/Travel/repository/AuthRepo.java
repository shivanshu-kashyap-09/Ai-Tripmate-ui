package com.example.Travel.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.Travel.entity.AuthUser;

@Repository
public interface AuthRepo extends MongoRepository<AuthUser, String> { 
    Optional<AuthUser> findByEmail(String email); 
}
