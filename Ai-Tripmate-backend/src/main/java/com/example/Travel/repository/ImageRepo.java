package com.example.Travel.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Travel.entity.ImageEntity;

public interface ImageRepo extends MongoRepository<ImageEntity, ObjectId> {

	ImageEntity findByExploreName(String query);

}
