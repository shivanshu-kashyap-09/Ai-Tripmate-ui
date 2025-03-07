package com.example.Travel.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//@Collation(value = "hotel")
public class HotelEntity {
//	@Id
//	private long id;
	
	private String city;
	private String price;
}
