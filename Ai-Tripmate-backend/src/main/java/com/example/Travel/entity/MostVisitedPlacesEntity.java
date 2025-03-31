package com.example.Travel.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document("most-visited-places")
public class MostVisitedPlacesEntity {
	
	@Id
	private ObjectId id;
	
	private String mostVisitPlaceName;
	
	private String mostVisitPlaceDescription;
	
	private String mostVisitPlaceImage;
	
	private String mostVisitPlaceAddress;

}
