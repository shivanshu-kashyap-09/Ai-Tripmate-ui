package com.example.Travel.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Travel.entity.TripEntity;

public interface TripRepo extends MongoRepository<TripEntity, ObjectId> {

	List<TripEntity> findByLocationName(List<String> locationNames);

}
