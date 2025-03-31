package com.example.Travel.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Travel.entity.RestaurantEntity;

public interface RestaurantRepo extends MongoRepository<RestaurantEntity, ObjectId>{

	List<RestaurantEntity> findByRestaurantName(List<String> restaurantNames);

}
