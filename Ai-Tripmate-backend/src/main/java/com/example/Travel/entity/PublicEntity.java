package com.example.Travel.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
 @Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "public")
public class PublicEntity {

	@Id
	private ObjectId id;
	
	private String userName;

	private String password;
	
	private String email;
	
	private String otp;
	
	private boolean verified;
}
