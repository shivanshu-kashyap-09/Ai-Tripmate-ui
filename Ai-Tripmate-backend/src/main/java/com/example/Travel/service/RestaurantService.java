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
import com.example.Travel.repository.RestaurantRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RestaurantService {

	@Autowired
	private FetchService fetchService;

	@Autowired
	private RestaurantRepo restaurantRepo;

	public ResponseEntity<?> getName(JournalEntity journalEntity) {
		try {
			String city = journalEntity.getCity();
			String price = journalEntity.getBudget();
			String message = "10 restaurant in " + city + " under " + price + " provide only restaurant name.";
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
			List<String> restaurantNames = fetchService.extractToList(response.getBody());
			JSONObject outputJson = new JSONObject();
			outputJson.put("restaurantNames", restaurantNames);
			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant name : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getPrice(String restaurantName) {
		try {
			String message = "provide me only average price range of " + restaurantName
					+ " restaurant not provide any other text.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant price : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getDesc(String restaurantName) {
		try {
			String message = "Provide a concise 20 words description of " + restaurantName
					+ ". No extra text, no introductions, just the main details.";

			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant description : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getRating(String restaurantName) {
		try {
			String message = "only provide google review rating of " + restaurantName
					+ " restaurant not provide any other text.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant rating : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public List<RestaurantEntity> getDetails(JournalEntity journalEntity) {
		try {
			String city = journalEntity.getCity();
			String price = journalEntity.getBudget();
			String message = "List exactly 10 resturant located in " + city + 
                    " within a budget of " + price + 
                    ". Provide only resturant names in a numbered list (e.g., 1. resturant XYZ city Name). " +
                    "Ensure all resturant are in " + city + " only.";

			String response = fetchService.getData(message);
			List<String> restaurantNames = fetchService.extractToList(response);

			List<RestaurantEntity> existingRestaurantNames = restaurantRepo.findByRestaurantName(restaurantNames);
			Map<String, RestaurantEntity> restaurantMap = existingRestaurantNames.stream().collect(
					Collectors.toMap(RestaurantEntity::getRestaurantName, r -> r, (existing, duplicate) -> existing));

			List<CompletableFuture<RestaurantEntity>> futres = restaurantNames.stream()
					.map(restaurantName -> CompletableFuture.supplyAsync(() -> {
						if (restaurantMap.containsKey(restaurantName)) {
							return validateAndUpdateRestaurantData(restaurantMap.get(restaurantName), price);
						}
						return fetchAndSaveRestaurantData(restaurantName, price);
					})).collect(Collectors.toList());

			return futres.stream().map(CompletableFuture::join).collect(Collectors.toList());
		} catch (Exception e) {
			log.error("Error occurred in restaurant details: ", e);
		}
		return null;
	}

	private RestaurantEntity validateAndUpdateRestaurantData(RestaurantEntity restaurantData, String price) {
		boolean needsUpdate = false;

		CompletableFuture<String> descFuture = null, priceFuture = null, ratingFuture = null, imageFuture = null;
		;

		if (restaurantData.getRestaurantDescription() == null || restaurantData.getRestaurantDescription().trim().isEmpty()) {
			needsUpdate = true;
			descFuture = CompletableFuture.supplyAsync(() -> fetchService
					.getData("Provide a concise 20 words description of " + restaurantData.getRestaurantName()
							+ ". No extra text, no introductions, just the main details."));
		}

		if (restaurantData.getRestaurantPrice() == null || restaurantData.getRestaurantPrice().trim().isEmpty()) {
			needsUpdate = true;
			priceFuture = CompletableFuture.supplyAsync(() -> fetchService
					.getData("provide me only average price range of " + restaurantData.getRestaurantName()
							+ " restaurant under" + price + " not provide any other text."));
		}

		if (restaurantData.getRestaurantRating() == null || restaurantData.getRestaurantRating().trim().isEmpty()) {
			needsUpdate = true;
			ratingFuture = CompletableFuture
					.supplyAsync(() -> fetchService.getData("only provide google review rating of "
							+ restaurantData.getRestaurantName() + " restaurant not provide any other text."));
		}

		if (restaurantData.getRestaurantImage() == null || restaurantData.getRestaurantImage().trim().isEmpty()) {
			needsUpdate = true;
			imageFuture = CompletableFuture
					.supplyAsync(() -> fetchService.searchImages(restaurantData.getRestaurantName()));
		}

		if (needsUpdate) {
			if (descFuture != null)
				restaurantData.setRestaurantDescription(descFuture.join());
			if (priceFuture != null)
				restaurantData.setRestaurantPrice(priceFuture.join());
			if (ratingFuture != null)
				restaurantData.setRestaurantRating(ratingFuture.join());
			if (imageFuture != null)
				restaurantData.setRestaurantImage(imageFuture.join());

			restaurantRepo.save(restaurantData);
		}

		return restaurantData;
	}

	private RestaurantEntity fetchAndSaveRestaurantData(String restaurantName, String price) {
		RestaurantEntity newRestaurantEntity = new RestaurantEntity();
		newRestaurantEntity.setRestaurantName(restaurantName);

		// Execute all API calls in parallel
		CompletableFuture<String> descFuture = CompletableFuture
				.supplyAsync(() -> fetchService.getData("Provide a concise 20 words description of " + restaurantName
						+ ". No extra text, no introductions, just the main details."));

		CompletableFuture<String> priceFuture = CompletableFuture
				.supplyAsync(() -> fetchService.getData("provide me only average price range of " + restaurantName
						+ " restaurant under" + price + " not provide any other text."));

		CompletableFuture<String> ratingFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
				"only provide google review rating of " + restaurantName + " restaurant not provide any other text."));

		CompletableFuture<String> imageFuture = CompletableFuture.supplyAsync(() -> fetchService.searchImages(restaurantName));
		
		// Wait for all data to be fetched
		newRestaurantEntity.setRestaurantDescription(descFuture.join());
		newRestaurantEntity.setRestaurantPrice(priceFuture.join());
		newRestaurantEntity.setRestaurantRating(ratingFuture.join());
		newRestaurantEntity.setRestaurantImage(imageFuture.join());

		restaurantRepo.save(newRestaurantEntity);
		return newRestaurantEntity;
	}
}
