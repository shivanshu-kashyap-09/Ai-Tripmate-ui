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

import com.example.Travel.entity.MostVisitedPlacesEntity;
import com.example.Travel.repository.MostVisitPlacesRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MostVisitPlacesService {

	@Autowired
	private FetchService fetchService;

	@Autowired
	private MostVisitPlacesRepo mostVisitPlacesRepo;


	public ResponseEntity<?> recommendedPlace() {
		try {
			String message = "top 10 tranding places all over world provide places name only.";
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
			List<String> recommendPlaces = fetchService.extractToList(response.getBody());
			JSONObject outputJson = new JSONObject();
			outputJson.put("recommendPlaces ", recommendPlaces);
			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in recommended Place : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> placeDesc(String place) {
		try {
			String message = "provide me 10 words Description of " + place + " place.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in places description : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public List<MostVisitedPlacesEntity> getDetails() {
		try {
			String message = "List the top 10 trending places worldwide. Provide only the place names.";
			String response = fetchService.getData(message);
			List<String> placesName = fetchService.extractToList(response);

			// Fetch existing data from DB
			List<MostVisitedPlacesEntity> existingPlaces = mostVisitPlacesRepo.findBymostVisitPlaceName(placesName);
			Map<String, MostVisitedPlacesEntity> placesMap = existingPlaces.stream()
					.collect(Collectors.toMap(MostVisitedPlacesEntity::getMostVisitPlaceName, p -> p));

			List<CompletableFuture<MostVisitedPlacesEntity>> futures = placesName.stream()
					.map(placeName -> CompletableFuture.supplyAsync(() -> {
						if (placesMap.containsKey(placeName)) {
							return validateAndUpdateData(placesMap.get(placeName));
						}
						return fetchAndSaveData(placeName);
					})).collect(Collectors.toList());

			// Wait for all tasks to complete
			return futures.stream().map(CompletableFuture::join).collect(Collectors.toList());

		} catch (Exception e) {
			log.error("Error occured in most visited places data : " + e);
			return null;
		}
	}

	private MostVisitedPlacesEntity validateAndUpdateData(MostVisitedPlacesEntity placeData) {
		boolean needsUpdate = false;

		CompletableFuture<String> descFuture = null, imageFuture = null, addressFuture = null;
		;

		if (placeData.getMostVisitPlaceDescription() == null || placeData.getMostVisitPlaceDescription().trim().isEmpty()) {
			needsUpdate = true;
			descFuture = CompletableFuture.supplyAsync(
					() -> fetchService.getData("Provide a concise 20 words description of " + placeData.getMostVisitPlaceName()
							+ ". No extra text, no introductions, just the main details."));
		}

		if (placeData.getMostVisitPlaceImage() == null || placeData.getMostVisitPlaceImage().trim().isEmpty()) {
			needsUpdate = true;
			imageFuture = CompletableFuture
					.supplyAsync(() -> fetchService.getData(fetchService.searchImages(placeData.getMostVisitPlaceName())));
		}

		if (placeData.getMostVisitPlaceAddress() == null || placeData.getMostVisitPlaceAddress().trim().isEmpty()) {
			needsUpdate = true;
			addressFuture = CompletableFuture.supplyAsync(() -> fetchService
					.getData("Provide one famous city and its country for " + placeData.getMostVisitPlaceName()
							+ " in the format: City, Country. If there are multiple cities, provide only the first one. Do not include any other text."));
		}

		if (needsUpdate) {
			if (descFuture != null)
				placeData.setMostVisitPlaceDescription(descFuture.join());
			if (imageFuture != null)
				placeData.setMostVisitPlaceImage(imageFuture.join());
			if (addressFuture != null)
				placeData.setMostVisitPlaceAddress(addressFuture.join());
			mostVisitPlacesRepo.save(placeData);
		}

		return placeData;
	}

	private MostVisitedPlacesEntity fetchAndSaveData(String placeName) {
		MostVisitedPlacesEntity newMostVisitedPlacesEntity = new MostVisitedPlacesEntity();
		newMostVisitedPlacesEntity.setMostVisitPlaceName(placeName);

		// Execute all API calls in parallel
		CompletableFuture<String> descFuture = CompletableFuture
				.supplyAsync(() -> fetchService.getData("Provide a concise 20 words description of " + placeName
						+ ". No extra text, no introductions, just the main details."));

		CompletableFuture<String> imageFuture = CompletableFuture
				.supplyAsync(() -> fetchService.searchImages(placeName));

		CompletableFuture<String> addressFuture = CompletableFuture
				.supplyAsync(() -> fetchService.getData("Provide one famous city and its country for " + placeName
						+ " in the format: City, Country. If there are multiple cities, provide only the first one. Do not include any other text."));

		// Wait for all data to be fetched
		newMostVisitedPlacesEntity.setMostVisitPlaceDescription(descFuture.join());
		newMostVisitedPlacesEntity.setMostVisitPlaceImage(imageFuture.join());
		newMostVisitedPlacesEntity.setMostVisitPlaceAddress(addressFuture.join());

		mostVisitPlacesRepo.save(newMostVisitedPlacesEntity);
		return newMostVisitedPlacesEntity;
	}
}
