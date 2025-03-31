package com.example.Travel.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Travel.entity.TravelEntity;

public interface TravelRepo extends MongoRepository<TravelEntity, ObjectId>{

	List<TravelEntity> findByTravelName(List<String> travelNames);

}
