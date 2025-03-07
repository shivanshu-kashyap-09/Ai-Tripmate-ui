package com.example.Travel.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;

import com.example.Travel.entity.TravelEntity;

public interface TravelRepo extends MongoRepository<TravelEntity, Long>{

	void save(ResponseEntity<?> name);

}
