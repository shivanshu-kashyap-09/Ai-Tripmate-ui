package com.example.Travel.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;

import com.example.Travel.entity.HotelEntity;

public interface HotelRepo extends MongoRepository<HotelEntity, Long>{

	void save(ResponseEntity<?> response);

}
