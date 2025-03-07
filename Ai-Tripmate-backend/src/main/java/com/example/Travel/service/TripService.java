package com.example.Travel.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Travel.entity.TripEntity;

@Service
public class TripService {

	@Autowired
	private FetchService fetchService;

	@Autowired
	private JsonConvertService jsonConvertService;

	public ResponseEntity<?> getLocation(TripEntity tripEntity) {
		try {
			// Construct message for AI API
			String message = "List only the names of visiting places (one per line) in " 
	                 + tripEntity.getCity() + " that can be visited in " 
	                 + tripEntity.getDays() + " days within a budget of Rs " 
	                 + tripEntity.getBudget() + " for " 
	                 + tripEntity.getPerson() + " persons. No descriptions, no costs, just place names.";


			// Fetch response from AI service
			ResponseEntity<String> temp = (ResponseEntity<String>) fetchService.get(message);

			// Validate response
			if (temp == null || temp.getBody() == null || temp.getBody().trim().isEmpty()) {
				return new ResponseEntity<>("No locations found", HttpStatus.NO_CONTENT);
			}

			// Extract places names from the AI response
			String responseText = temp.getBody().trim();
			List<String> locationNames = extractPlaceNames(responseText); // Fix applied here

			// If extraction failed, return an appropriate response
			if (locationNames.isEmpty()) {
				return new ResponseEntity<>("No valid locations found", HttpStatus.NO_CONTENT);
			}

			// Convert to JSON format
			JSONObject outputJson = new JSONObject();
			outputJson.put("places", locationNames); // Fixed JSON key formatting

			System.out.println("AI Response: " + responseText);
			System.out.println("Extracted Places: " + outputJson.toString());

			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occurred in getLocation: " + e.getMessage());
			return new ResponseEntity<>("An error occurred while fetching locations", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Extracts place names from the AI response text.
	 */
	private List<String> extractPlaceNames(String responseText) {
		List<String> places = new ArrayList<>();
		String[] lines = responseText.split("\n");

		for (String line : lines) {
			// Check if the line starts with a number (e.g., "1. Chandi Devi Temple")
			if (line.matches("^\\d+\\.\\s*(.*)")) {
				String placeName = line.replaceAll("^\\d+\\.\\s*", "").trim();
				places.add(placeName);
			}
		}
		return places;
	}

	public ResponseEntity<?> getTime(String location) {
		try {
			String message = "Provide only the estimated time required to visit " + location + 
	                 ". No extra details, just the time duration.";

			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in trip time " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getBudget(String location){
		try {
			String message = "Provide only the estimated budget required to visit " + location + 
	                 ". No descriptions, no breakdown, just the total amount in INR.";

			ResponseEntity<?> budget = fetchService.get(message);
			return new ResponseEntity<>(budget , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in trip location budget "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getPlaceRating(String location) {
		try {
			String message = "Provide only the Google review rating of " + location + 
	                 " place. No extra text, no descriptions, just the rating value.";

			ResponseEntity<?> budget = fetchService.get(message);
			return new ResponseEntity<>(budget, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in trip places rating " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getPlaceDesc(String location) {
		try {
			String message = "Provide a concise 3-line description of " + location + 
	                 ". No extra text, no introductions, just the main details.";

			ResponseEntity<?> budget = fetchService.get(message);
			return new ResponseEntity<>(budget, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in trip places desc " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
