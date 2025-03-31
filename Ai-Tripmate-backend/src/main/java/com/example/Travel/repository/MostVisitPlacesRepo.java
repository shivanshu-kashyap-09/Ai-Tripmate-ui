package com.example.Travel.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Travel.entity.MostVisitedPlacesEntity;

public interface MostVisitPlacesRepo extends MongoRepository<MostVisitedPlacesEntity, ObjectId> {

	List<MostVisitedPlacesEntity> findBymostVisitPlaceName(List<String> placesName);

}
