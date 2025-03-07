package com.example.Travel.entity;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "public")
@Getter
 @Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublicEntity {

	@Id
	private ObjectId id;
	
	private String userName;

	private String password;
	
	private String email;
	
	private String otp;
	
	private boolean verified;
}
