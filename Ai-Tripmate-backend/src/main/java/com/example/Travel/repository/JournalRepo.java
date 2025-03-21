package com.example.Travel.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.Travel.entity.JournalEntity;

@Repository
public interface JournalRepo extends MongoRepository<JournalEntity, ObjectId>{
	JournalEntity findByExploreName(String hotelName);

	List<JournalEntity> findByExploreNameIn(List<String> hotelNames);
}
