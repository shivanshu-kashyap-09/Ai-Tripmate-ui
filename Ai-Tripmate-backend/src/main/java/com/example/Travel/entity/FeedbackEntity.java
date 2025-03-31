package com.example.Travel.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document("feedback")
public class FeedbackEntity {
	
	@Id
	private ObjectId id;
	
	private String userEmail;
	
	private String rating;
	
	private String userName;
	
	private String userComment;

}
