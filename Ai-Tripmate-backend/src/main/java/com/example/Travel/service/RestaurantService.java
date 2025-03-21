package com.example.Travel.service;

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
import com.example.Travel.entity.RestaurantEntity;
import com.example.Travel.repository.JournalRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RestaurantService {
	
	@Autowired
	private FetchService fetchService;
	
	@Autowired
	private JournalRepo journalRepo;

	
	public ResponseEntity<?> getName(RestaurantEntity restaurantEntity){
		try {
			String city = restaurantEntity.getCity();
			String price = restaurantEntity.getPrice();
			String message = "10 restaurant in "+city+" under "+price+" provide only restaurant name.";
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
	        List<String> restaurantNames = fetchService.extractToList(response.getBody());
	        JSONObject outputJson = new JSONObject();
	        outputJson.put("restaurantNames", restaurantNames);
	        return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant name : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getPrice(String restaurantName){
		try {
			String message = "provide me only average price range of "+restaurantName+" restaurant not provide any other text.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant price : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getDesc(String restaurantName){
		try {
			String message = "Provide a concise 20 words description of " + restaurantName + 
	                 ". No extra text, no introductions, just the main details.";

			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant description : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getRating(String restaurantName){
		try {
			String message = "only provide google review rating of "+restaurantName+" restaurant not provide any other text.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant rating : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public List<JournalEntity> getDetails(RestaurantEntity restaurantEntity){
		try {
			String city = restaurantEntity.getCity();
	        String price = restaurantEntity.getPrice();
	        String message = "10 restaurant in "+city+" under "+price+" provide only restaurant name.";
	        
	        String response = fetchService.getData(message);
	        List<String> restaurantNames = fetchService.extractToList(response);
	        
	        List<JournalEntity> existingRestaurantNames = journalRepo.findByExploreNameIn(restaurantNames);
	        Map<String, JournalEntity> restaurantMap = existingRestaurantNames.stream()
	                .collect(Collectors.toMap(JournalEntity::getExploreName, r -> r, (existing, duplicate) -> existing));

	        
	        List<CompletableFuture<JournalEntity>> futres = restaurantNames.stream()
	        		.map(restaurantName -> CompletableFuture.supplyAsync(() -> {
	        			if(restaurantMap.containsKey(restaurantName)) {
	        				return validateAndUpdateRestaurantData(restaurantMap.get(restaurantName),price);
	        			}
	        			return fetchAndSaveRestaurantData(restaurantName , price);
	        		})).collect(Collectors.toList());
	        
	        return futres.stream().map(CompletableFuture :: join).collect(Collectors.toList());
		} catch (Exception e) {
			log.error("Error occurred in restaurant details: ", e);
		}
		return null;
	}
	
	private JournalEntity validateAndUpdateRestaurantData(JournalEntity restaurantData, String price) {
	    boolean needsUpdate = false;

	    CompletableFuture<String> descFuture = null, priceFuture = null, ratingFuture = null;

	    if (restaurantData.getDescription() == null || restaurantData.getDescription().trim().isEmpty()) {
	        needsUpdate = true;
	        descFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	            "Provide a concise 20 words description of " + restaurantData.getExploreName() + ". No extra text, no introductions, just the main details."));
	    }

	    if (restaurantData.getPriceRange() == null || restaurantData.getPriceRange().trim().isEmpty()) {
	        needsUpdate = true;
	        priceFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	            "provide me only average price range of " + restaurantData.getExploreName() + " restaurant under" + price + " not provide any other text."));
	    }

	    if (restaurantData.getRating() == null || restaurantData.getRating().trim().isEmpty()) {
	        needsUpdate = true;
	        ratingFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	            "only provide google review rating of " + restaurantData.getExploreName() + " restaurant not provide any other text."));
	    }

	    if (needsUpdate) {
	        if (descFuture != null) restaurantData.setDescription(descFuture.join());
	        if (priceFuture != null) restaurantData.setPriceRange(priceFuture.join());
	        if (ratingFuture != null) restaurantData.setRating(ratingFuture.join());

	        journalRepo.save(restaurantData);
	    }

	    return restaurantData;
	}

	private JournalEntity fetchAndSaveRestaurantData(String restaurantName, String price) {
	    JournalEntity newJournalEntity = new JournalEntity();
	    newJournalEntity.setExploreName(restaurantName);

	    // Execute all API calls in parallel
	    CompletableFuture<String> descFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	        "Provide a concise 20 words description of " + restaurantName + ". No extra text, no introductions, just the main details."));

	    CompletableFuture<String> priceFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	        "provide me only average price range of " + restaurantName + " restaurant under" + price + " not provide any other text."));

	    CompletableFuture<String> ratingFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
	        "only provide google review rating of " + restaurantName + " restaurant not provide any other text."));

	    // Wait for all data to be fetched
	    newJournalEntity.setDescription(descFuture.join());
	    newJournalEntity.setPriceRange(priceFuture.join());
	    newJournalEntity.setRating(ratingFuture.join());

	    journalRepo.save(newJournalEntity);
	    return newJournalEntity;
	}
}
