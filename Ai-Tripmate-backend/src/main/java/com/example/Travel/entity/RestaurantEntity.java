package com.example.Travel.entity;

import org.springframework.data.mongodb.core.annotation.Collation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Collation(value = "Restaurant")
public class RestaurantEntity {

	private String city;
	private String price;
}
