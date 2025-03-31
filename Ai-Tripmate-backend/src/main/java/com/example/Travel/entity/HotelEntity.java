package com.example.Travel.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document("Hotels")
public class HotelEntity {
	
	@Id
	private ObjectId id;
	
	private String hotelName;
	
	private String hotelDescription;
	
	private String hotelPrice;
	
	private String hotelRating;
	
	private String hotelImage;
}
