package com.example.Travel.entity;

import java.util.Date;

import org.springframework.data.mongodb.core.annotation.Collation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//@Collation(value = "travel")
public class TravelEntity {
	
	private String fromDes;
	private String toDes;
	private String date;
}
