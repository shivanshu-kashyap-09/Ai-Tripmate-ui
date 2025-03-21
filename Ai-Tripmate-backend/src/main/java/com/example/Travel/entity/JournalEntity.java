package com.example.Travel.entity;

import org.bson.types.ObjectId;
import org.springframework.ai.image.Image;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document("journalEntity")
public class JournalEntity {
	
	@Id
	private ObjectId id;
	
	private String exploreName;
	
	private String description;
	
	private String priceRange;
	
	private String rating;
	
	private String image;
	
	private String time;
	
	private String travelTime;
	
	private String ticket;

}
