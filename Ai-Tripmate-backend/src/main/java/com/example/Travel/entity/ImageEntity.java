package com.example.Travel.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document("Images")
public class ImageEntity {
	
	@Id
	private ObjectId id;
	
	private String exploreName;
	
	private String image;

}
