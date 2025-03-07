package com.example.Travel.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class FetchService {
	
	private final ChatClient chatClient;
	
	 @Autowired
	    public FetchService(ChatClient.Builder builder) {
	        this.chatClient = builder.build();
	    }
	
	public ResponseEntity<?> get(String message) {
		try {
			String response = chatClient.prompt().user(message).call().content();
            return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in fetch "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public List<String> extractToList(String responseText) {
	    List<String> hotelNames = new ArrayList<>();

	    if (responseText != null && !responseText.isEmpty()) {
	        String[] lines = responseText.split("\n"); // Split response into lines

	        for (String line : lines) {
	            line = line.trim();
	            if (line.matches("^[0-9]+\\.\\s+.*")) { // Match numbered list items (e.g., "1. Hotel XYZ")
	                String hotelName = line.substring(line.indexOf(" ") + 1).trim();
	                hotelNames.add(hotelName);
	            }
	        }
	    }

	    return hotelNames;
	}
}
