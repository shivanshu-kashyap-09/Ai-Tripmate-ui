package com.example.Travel.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Travel.entity.JournalEntity;
import com.example.Travel.entity.TripEntity;
import com.example.Travel.repository.TripRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TripService {

	@Autowired
	private FetchService fetchService;

	@Autowired
	private TripRepo tripRepo;

	public ResponseEntity<?> getLocation(JournalEntity journalEntity) {
		try {
			String message = "List only the names of visiting places (one per line) in " + journalEntity.getCity()
					+ " that can be visited in " + journalEntity.getDays() + " days within a budget of Rs "
					+ journalEntity.getBudget() + " for " + journalEntity.getPerson()
					+ " persons. No descriptions, no costs, just place names.";
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
			if (response == null || response.getBody() == null || response.getBody().trim().isEmpty()) {
				return new ResponseEntity<>("No locations found", HttpStatus.NO_CONTENT);
			}
			List<String> locationNames = extractPlaceNames(response.getBody().trim()); // Fix applied here
			if (locationNames.isEmpty()) {
				return new ResponseEntity<>("No valid locations found", HttpStatus.NO_CONTENT);
			}
			JSONObject outputJson = new JSONObject();
			outputJson.put("placesNames", locationNames);
			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occurred in getLocation : " + e.getMessage());
			return new ResponseEntity<>("An error occurred while fetching locations", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private List<String> extractPlaceNames(String responseText) {
		List<String> places = new ArrayList<>();
		String[] lines = responseText.split("\n");
		for (String line : lines) {
			// Check if the line starts with a number (e.g., "1.")
			if (line.matches("^\\d+\\.\\s*(.*)")) {
				String placeName = line.replaceAll("^\\d+\\.\\s*", "").trim();
				places.add(placeName);
			}
		}
		return places;
	}

	public ResponseEntity<?> getTime(String location) {
		try {
			String message = "Provide only the estimated time required to visit " + location
					+ ". No extra details, just the time duration.";
			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in trip time : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getBudget(String location) {
		try {
			String message = "Provide only the estimated budget required to visit " + location
					+ ". No descriptions, no breakdown, just the total amount in INR.";

			ResponseEntity<?> budget = fetchService.get(message);
			return new ResponseEntity<>(budget, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in trip location budget : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getPlaceRating(String location) {
		try {
			String message = "Provide only the Google review rating of " + location
					+ " place. No extra text, no descriptions, just the rating value.";

			ResponseEntity<?> budget = fetchService.get(message);
			return new ResponseEntity<>(budget, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in trip places rating : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getPlaceDesc(String location) {
		try {
			String message = "Provide a concise 20 words description of " + location
					+ ". No extra text, no introductions, just the main details.";

			ResponseEntity<?> budget = fetchService.get(message);
			return new ResponseEntity<>(budget, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in trip places desc : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public List<TripEntity> getDetails(JournalEntity journalEntity) {
		try {
			String message = "List the names of visiting places in " + journalEntity.getCity() +
	                 " that can be explored in " + journalEntity.getDays() + " days within a budget of Rs " +
	                 journalEntity.getBudget() + " for " + journalEntity.getPerson() + 
	                 " persons. Provide only the place names in a numbered list (e.g., 1. Place Name, City Name). " +
	                 "No descriptions, no costs, no extra text.";
			String response = fetchService.getData(message);
			List<String> locationNames = fetchService.extractToList(response);

			List<TripEntity> existingLocations = tripRepo.findByLocationName(locationNames);
			Map<String, TripEntity> locationMap = existingLocations.stream()
					.collect(Collectors.toMap(TripEntity::getLocationName, l -> l));

			List<CompletableFuture<TripEntity>> futures = locationNames.stream()
					.map(locationName -> CompletableFuture.supplyAsync(() -> {
						if (locationMap.containsKey(locationName)) {
							return validateAndUpdateLocationData(locationMap.get(locationName), journalEntity.getBudget());
						}
						return fetchAndSaveLocationData(locationName, journalEntity.getBudget());
					})).collect(Collectors.toList());

			return futures.stream().map(CompletableFuture::join).collect(Collectors.toList());
		} catch (Exception e) {
			log.error("Error occured in trip details : " + e);
			return null;
		}
	}

	private TripEntity validateAndUpdateLocationData(TripEntity locationData, String price) {
		boolean needsUpdate = false;
		CompletableFuture<String> descFuture = null, priceFuture = null, ratingFuture = null , imageFuture = null , visitTimeFuture = null;

		if (locationData.getLocationDescription() == null || locationData.getLocationDescription().trim().isEmpty()) {
			needsUpdate = true;
			descFuture = CompletableFuture.supplyAsync(() -> fetchService
					.getData("Provide a concise 20 words description of " + locationData.getLocationName()
							+ ". No extra text, no introductions, just the main details."));
		}
		if (locationData.getLocationPrice() == null || locationData.getLocationPrice().trim().isEmpty()) {
			needsUpdate = true;
			priceFuture = CompletableFuture.supplyAsync(() -> fetchService
					.getData("Provide only the estimated budget required to visit " + locationData.getLocationName()
							+ ". No descriptions, no breakdown, just the total amount in INR."));
		}
		if (locationData.getLocationRating() == null || locationData.getLocationRating().trim().isEmpty()) {
			needsUpdate = true;
			ratingFuture = CompletableFuture.supplyAsync(() -> fetchService
					.getData("Provide only the Google review rating of " + locationData.getLocationName()
							+ " place. No extra text, no descriptions, just the rating value."));
		}
		
		if(locationData.getLocationImage() == null || locationData.getLocationImage().trim().isEmpty()) {
			needsUpdate = true;
			imageFuture = CompletableFuture.supplyAsync(() -> fetchService.searchImages(locationData.getLocationName()));
		}
		
		if(locationData.getLocationVisitTime() == null || locationData.getLocationVisitTime().trim().isEmpty()) {
			needsUpdate = true;
			visitTimeFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
				    "Provide the average time required to visit " + locationData.getLocationName() +
				    ". Give only the duration in hours or minutes (e.g., '2 hours' or '45 minutes'). No extra text."
				));

		}

		if (needsUpdate) {
			if (descFuture != null)
				locationData.setLocationDescription(descFuture.join());
			if (priceFuture != null)
				locationData.setLocationPrice(priceFuture.join());
			if (ratingFuture != null)
				locationData.setLocationRating(ratingFuture.join());
			if(imageFuture != null)
				locationData.setLocationImage(imageFuture.join());
			if(visitTimeFuture != null)
				locationData.setLocationVisitTime(visitTimeFuture.join());

			tripRepo.save(locationData);
		}
		return locationData;
	}
	
	private TripEntity fetchAndSaveLocationData(String locationName , String price) {
		TripEntity newTripEntity = new TripEntity();
		newTripEntity.setLocationName(locationName);
	    
	    CompletableFuture<String> descFuture = CompletableFuture.supplyAsync(() -> fetchService
				.getData("Provide a concise 20 words description of " + locationName
				+ ". No extra text, no introductions, just the main details."));
	    
	    CompletableFuture<String> priceFuture = CompletableFuture.supplyAsync(() -> fetchService
				.getData("Provide only the estimated budget required to visit " + locationName
				+ ". No descriptions, no breakdown, just the total amount in INR."));
	    
	    CompletableFuture<String> ratingFuture = CompletableFuture.supplyAsync(() -> fetchService
				.getData("Provide only the Google review rating of " + locationName
				+ " place. No extra text, no descriptions, just the rating value."));
	    
	   CompletableFuture<String> imageFuture = CompletableFuture.supplyAsync(() -> fetchService.searchImages(locationName));
	   
	   CompletableFuture<String> visitTimeFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
			   "Provide the average time required to visit " + locationName +
			    ". Give only the duration in hours or minutes (e.g., '2 hours' or '45 minutes'). No extra text."));
	    
	   newTripEntity.setLocationDescription(descFuture.join());
	   newTripEntity.setLocationPrice(priceFuture.join());
	   newTripEntity.setLocationRating(ratingFuture.join());
	   newTripEntity.setLocationImage(imageFuture.join());
	   newTripEntity.setLocationVisitTime(visitTimeFuture.join());
	    tripRepo.save(newTripEntity);
	    return newTripEntity;
	}

}
