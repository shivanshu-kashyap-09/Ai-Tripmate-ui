package com.example.Travel.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Travel.entity.FeedbackEntity;

public interface FeedbackRepo extends MongoRepository<FeedbackEntity, ObjectId> {

}
