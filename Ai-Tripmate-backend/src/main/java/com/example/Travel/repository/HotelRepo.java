package com.example.Travel.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Travel.entity.HotelEntity;

public interface HotelRepo extends MongoRepository<HotelEntity, ObjectId> {

	List<HotelEntity> findByHotelName(List<String> hotelNames);

}
