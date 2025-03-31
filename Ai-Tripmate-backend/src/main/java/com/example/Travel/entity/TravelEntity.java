package com.example.Travel.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document("travels")
public class TravelEntity {
	
	@Id
	private ObjectId id;
	
	private String travelName;
	
	private String travelStratTime;
	
	private String travelTicket;
	
	private String travelDuration;
	
	private String travelImage;
}
