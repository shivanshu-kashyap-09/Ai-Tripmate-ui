package com.example.Travel.entity;

import org.springframework.data.mongodb.core.annotation.Collation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Collation(value = "trip")
public class TripEntity {
	
	private String city;
	private String budget;
	private String days;
	private String person;

}
