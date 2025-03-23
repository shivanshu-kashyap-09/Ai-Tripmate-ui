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

import com.example.Travel.controller.ImageController;
import com.example.Travel.entity.JournalEntity;
import com.example.Travel.entity.TripEntity;
import com.example.Travel.repository.JournalRepo;
import com.fasterxml.jackson.annotation.JsonFormat.Features;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TripService {

	@Autowired
	private FetchService fetchService;

	@Autowired
	private JournalRepo journalRepo;
	
	@Autowired
	private ImageController imageController;

	public ResponseEntity<?> getLocation(TripEntity tripEntity) {
		try {
			String message = "List only the names of visiting places (one per line) in " + tripEntity.getCity()
					+ " that can be visited in " + tripEntity.getDays() + " days within a budget of Rs "
					+ tripEntity.getBudget() + " for " + tripEntity.getPerson()
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

	public List<JournalEntity> getDetails(TripEntity tripEntity) {
		try {
			String message = "List only the names of visiting places (one per line) in " + tripEntity.getCity()
					+ " that can be visited in " + tripEntity.getDays() + " days within a budget of Rs "
					+ tripEntity.getBudget() + " for " + tripEntity.getPerson()
					+ " persons. No descriptions, no costs, just place names.";
			String response = fetchService.getData(message);
			List<String> locationNames = fetchService.extractToList(response);

			List<JournalEntity> existingLocations = journalRepo.findByExploreNameIn(locationNames);
			Map<String, JournalEntity> locationMap = existingLocations.stream()
					.collect(Collectors.toMap(JournalEntity::getExploreName, l -> l));

			List<CompletableFuture<JournalEntity>> futures = locationNames.stream()
					.map(locationName -> CompletableFuture.supplyAsync(() -> {
						if (locationMap.containsKey(locationName)) {
							return validateAndUpdateLocationData(locationMap.get(locationName), tripEntity.getBudget());
						}
						return fetchAndSaveLocationData(locationName, tripEntity.getBudget());
					})).collect(Collectors.toList());

			return futures.stream().map(CompletableFuture::join).collect(Collectors.toList());
		} catch (Exception e) {
			log.error("Error occured in trip details : " + e);
			return null;
		}
	}

	private JournalEntity validateAndUpdateLocationData(JournalEntity locationData, String price) {
		boolean needsUpdate = false;
		CompletableFuture<String> descFuture = null, priceFuture = null, ratingFuture = null , imageFuture = null;

		if (locationData.getDescription() == null || locationData.getDescription().trim().isEmpty()) {
			needsUpdate = true;
			descFuture = CompletableFuture.supplyAsync(() -> fetchService
					.getData("Provide a concise 20 words description of " + locationData.getExploreName()
							+ ". No extra text, no introductions, just the main details."));
		}
		if (locationData.getPriceRange() == null || locationData.getPriceRange().trim().isEmpty()) {
			needsUpdate = true;
			priceFuture = CompletableFuture.supplyAsync(() -> fetchService
					.getData("Provide only the estimated budget required to visit " + locationData.getExploreName()
							+ ". No descriptions, no breakdown, just the total amount in INR."));
		}
		if (locationData.getRating() == null || locationData.getRating().trim().isEmpty()) {
			needsUpdate = true;
			ratingFuture = CompletableFuture.supplyAsync(() -> fetchService
					.getData("Provide only the Google review rating of " + locationData.getExploreName()
							+ " place. No extra text, no descriptions, just the rating value."));
		}
		
		if(locationData.getImage() == null || locationData.getImage().trim().isEmpty()) {
			needsUpdate = true;
			imageFuture = CompletableFuture.supplyAsync(() -> imageController.searchImages(locationData.getExploreName()));
		}

		if (needsUpdate) {
			if (descFuture != null)
				locationData.setDescription(descFuture.join());
			if (priceFuture != null)
				locationData.setPriceRange(priceFuture.join());
			if (ratingFuture != null)
				locationData.setRating(ratingFuture.join());
			if(imageFuture != null)
				locationData.setImage(imageFuture.join());

			journalRepo.save(locationData);
		}
		return locationData;
	}
	
	private JournalEntity fetchAndSaveLocationData(String locationName , String price) {
		JournalEntity newJournalEntity = new JournalEntity();
	    newJournalEntity.setExploreName(locationName);
	    
	    CompletableFuture<String> descFuture = CompletableFuture.supplyAsync(() -> fetchService
				.getData("Provide a concise 20 words description of " + locationName
				+ ". No extra text, no introductions, just the main details."));
	    
	    CompletableFuture<String> priceFuture = CompletableFuture.supplyAsync(() -> fetchService
				.getData("Provide only the estimated budget required to visit " + locationName
				+ ". No descriptions, no breakdown, just the total amount in INR."));
	    
	    CompletableFuture<String> ratingFuture = CompletableFuture.supplyAsync(() -> fetchService
				.getData("Provide only the Google review rating of " + locationName
				+ " place. No extra text, no descriptions, just the rating value."));
	    
	   CompletableFuture<String> imageFuture = CompletableFuture.supplyAsync(() -> imageController.searchImages(locationName));
	    
	    newJournalEntity.setDescription(descFuture.join());
	    newJournalEntity.setPriceRange(priceFuture.join());
	    newJournalEntity.setRating(ratingFuture.join());
	    newJournalEntity.setImage(imageFuture.join());
	    
	    journalRepo.save(newJournalEntity);
	    return newJournalEntity;
	}

}
