package com.example.Travel.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "users")
public class AuthUser {

    @Id
    private String id; 

    private String email;
    private String name;
    private String picture;

    public AuthUser(String email, String name, String picture) {
        this.email = email;
        this.name = name;
        this.picture = picture;
    }

	public void setName(String name2) {
		// TODO Auto-generated method stub
		
	}
}
