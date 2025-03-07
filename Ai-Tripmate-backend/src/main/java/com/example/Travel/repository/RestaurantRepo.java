package com.example.Travel.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Travel.entity.RestaurantEntity;

public interface RestaurantRepo extends MongoRepository<RestaurantEntity, Long>{

}
