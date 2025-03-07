package com.example.Travel.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.Travel.entity.PublicEntity;

@Repository
public interface PublicRepo extends MongoRepository<PublicEntity, Long>{
	
public PublicEntity getByEmail(String email);
	
	public PublicEntity findByUserName(String userName);

}
