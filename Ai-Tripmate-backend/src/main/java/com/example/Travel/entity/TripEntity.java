package com.example.Travel.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document("trip-locations")
public class TripEntity {
	
	@Id
	private ObjectId id;
	
	private String locationName;
	
	private String locationDescription;
	
	private String locationPrice;
	
	private String locationVisitTime;
	
	private String locationImage;
	
	private String locationRating;

}
