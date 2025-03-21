package com.example.Travel.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Travel.entity.HotelEntity;
import com.example.Travel.entity.JournalEntity;
import com.example.Travel.repository.JournalRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class HotelService {
	
	@Autowired
	private FetchService fetchService;
	
	@Autowired
	private JournalRepo journalRepo;

	 
	public ResponseEntity<?> getHotelsName(HotelEntity hotelEntity) {
		try {
			String city = hotelEntity.getCity();
			String price = hotelEntity.getPrice();
			String message = "10 hotel in "+city+" under "+price+" only provide a hotel name";
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
	        List<String> hotelNames = fetchService.extractToList(response.getBody());
	        System.out.println("hotels : "+hotelNames);
	        JSONObject outputJson = new JSONObject();
	        outputJson.put("hotels", hotelNames);
	        System.out.println("hotels. : "+outputJson.toString());
	        return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in hotel : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getHotelsPrice(String hotelName){
		try {
			String message = "provide me only average price range of "+hotelName+" hotel not provide any other text.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response.getBody() , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in hotel price : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getHotelsDesc(String hotelName){
		try {
			String message = "Provide a concise 20 words description of " + hotelName + 
	                 ". No extra text, no introductions, just the main details.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response.getBody() , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in hotel description : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getHotelsRating(String hotelName){
		try {
			String message = "only provide google review rating of "+hotelName+" hotel not provide any other text.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response.getBody() , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in hotel rating : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public List<JournalEntity> getDetails(HotelEntity hotelEntity) {
	    try {
	        String city = hotelEntity.getCity();
	        String price = hotelEntity.getPrice();
	        String message = "10 hotel in " + city + " under " + price + " only provide a hotel name";

	        String response = fetchService.getData(message);
	        List<String> hotelNames = fetchService.extractToList(response);

	        // Fetch existing data from DB 
	        List<JournalEntity> existingHotels = journalRepo.findByExploreNameIn(hotelNames);
	        Map<String, JournalEntity> hotelMap = existingHotels.stream()
	                .collect(Collectors.toMap(JournalEntity::getExploreName, h -> h));

	        List<CompletableFuture<JournalEntity>> futures = hotelNames.stream()
	                .map(hotelName -> CompletableFuture.supplyAsync(() -> {
	                    if (hotelMap.containsKey(hotelName)) {
	                        return validateAndUpdateHotelData(hotelMap.get(hotelName), price);
	                    }
	                    return fetchAndSaveHotelData(hotelName, price);
	                }))
	                .collect(Collectors.toList());

	        // Wait for all tasks to complete
	        return futures.stream().map(CompletableFuture::join).collect(Collectors.toList());

	    } catch (Exception e) {
	        log.error("Error occurred in hotel details: ", e);
	        return null;
	    }
	}

	private JournalEntity validateAndUpdateHotelData(JournalEntity hotelData, String price) {
	    boolean needsUpdate = false;

	    CompletableFuture<String> descFuture = null, priceFuture = null, ratingFuture = null;

	    if (hotelData.getDescription() == null || hotelData.getDescription().trim().isEmpty()) {
	        needsUpdate = true;
	        descFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	            "Provide a concise 20 words description of " + hotelData.getExploreName() + ". No extra text, no introductions, just the main details."));
	    }

	    if (hotelData.getPriceRange() == null || hotelData.getPriceRange().trim().isEmpty()) {
	        needsUpdate = true;
	        priceFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	            "provide me only average price range of " + hotelData.getExploreName() + " hotel under" + price + " not provide any other text."));
	    }

	    if (hotelData.getRating() == null || hotelData.getRating().trim().isEmpty()) {
	        needsUpdate = true;
	        ratingFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	            "only provide google review rating of " + hotelData.getExploreName() + " hotel not provide any other text."));
	    }

	    if (needsUpdate) {
	        if (descFuture != null) hotelData.setDescription(descFuture.join());
	        if (priceFuture != null) hotelData.setPriceRange(priceFuture.join());
	        if (ratingFuture != null) hotelData.setRating(ratingFuture.join());

	        journalRepo.save(hotelData);
	    }

	    return hotelData;
	}

	private JournalEntity fetchAndSaveHotelData(String hotelName, String price) {
	    JournalEntity newJournalEntity = new JournalEntity();
	    newJournalEntity.setExploreName(hotelName);

	    // Execute all API calls in parallel
	    CompletableFuture<String> descFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	        "Provide a concise 20 words description of " + hotelName + ". No extra text, no introductions, just the main details."));

	    CompletableFuture<String> priceFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	        "provide me only average price range of " + hotelName + " hotel under" + price + " not provide any other text."));

	    CompletableFuture<String> ratingFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	        "only provide google review rating of " + hotelName + " hotel not provide any other text."));

	    // Wait for all data to be fetched
	    newJournalEntity.setDescription(descFuture.join());
	    newJournalEntity.setPriceRange(priceFuture.join());
	    newJournalEntity.setRating(ratingFuture.join());

	    journalRepo.save(newJournalEntity);
	    return newJournalEntity;
	}
}
