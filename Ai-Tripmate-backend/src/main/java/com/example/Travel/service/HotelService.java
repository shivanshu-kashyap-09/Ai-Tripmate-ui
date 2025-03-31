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

import com.example.Travel.entity.HotelEntity;
import com.example.Travel.entity.JournalEntity;
import com.example.Travel.repository.HotelRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class HotelService {
	
	@Autowired
	private FetchService fetchService;
	
	@Autowired
	private HotelRepo hotelRepo;

	public ResponseEntity<?> getHotelsName(JournalEntity journalEntity) {
		try {
			String city = journalEntity.getCity();
			String price = journalEntity.getBudget();
			String message = "10 hotel in "+city+" under "+price+" only provide a hotel name";
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
	        List<String> hotelNames = fetchService.extractToList(response.getBody());
	        JSONObject outputJson = new JSONObject();
	        outputJson.put("hotels", hotelNames);
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
	
	public List<HotelEntity> getDetails(JournalEntity journalEntity) {
        try {
            String city = journalEntity.getCity();
            String price = journalEntity.getBudget();
            String message = "List exactly 10 hotels located in " + city + 
                    " within a budget of " + price + 
                    ". Provide only hotel names in a numbered list (e.g., 1. Hotel XYZ city Name). " +
                    "Ensure all hotels are in " + city + " only.";

            String response = fetchService.getData(message);
            System.out.println("API Response: " + response);
            List<String> hotelNames = fetchService.extractToList(response);

            // Fetch existing data from DB
            List<HotelEntity> existingHotels = hotelRepo.findByHotelName(hotelNames);
            Map<String, HotelEntity> hotelMap = existingHotels.stream()
                    .collect(Collectors.toMap(HotelEntity::getHotelName, h -> h));

            List<CompletableFuture<HotelEntity>> futures = hotelNames.stream()
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
            System.err.println("Error occurred in hotel details: " + e.getMessage());
            return null;
        }
    }

    private HotelEntity validateAndUpdateHotelData(HotelEntity hotelData, String price) {
        boolean needsUpdate = false;

        CompletableFuture<String> descFuture = null, priceFuture = null, ratingFuture = null, imageFuture = null;

        if (hotelData.getHotelDescription() == null || hotelData.getHotelDescription().trim().isEmpty()) {
            needsUpdate = true;
            descFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
                    "Provide a concise 20 words description of " + hotelData.getHotelName() + ". No extra text, no introductions, just the main details."));
        }

        if (hotelData.getHotelPrice() == null || hotelData.getHotelPrice().trim().isEmpty()) {
            needsUpdate = true;
            priceFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
                    "Provide only the average price range of " + hotelData.getHotelName() + " hotel under " + price + ". No extra text."));
        }

        if (hotelData.getHotelRating() == null || hotelData.getHotelRating().trim().isEmpty()) {
            needsUpdate = true;
            ratingFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
                    "Provide only the Google review rating of " + hotelData.getHotelName() + " hotel. No extra text."));
        }

        if (hotelData.getHotelImage() == null || hotelData.getHotelImage().trim().isEmpty()) {
            needsUpdate = true;
            imageFuture = CompletableFuture.supplyAsync(() -> fetchService.searchImages(hotelData.getHotelImage()));
        }

        if (needsUpdate) {
            if (descFuture != null) hotelData.setHotelDescription(descFuture.join());
            if (priceFuture != null) hotelData.setHotelPrice(priceFuture.join());
            if (ratingFuture != null) hotelData.setHotelRating(ratingFuture.join());
            if (imageFuture != null) hotelData.setHotelImage(imageFuture.join());

            hotelRepo.save(hotelData);
        }

        return hotelData;
    }

    private HotelEntity fetchAndSaveHotelData(String hotelName, String price) {
        HotelEntity newHotelEntity = new HotelEntity();
        newHotelEntity.setHotelName(hotelName);

        // Execute all API calls in parallel
        CompletableFuture<String> descFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
                "Provide a concise 20 words description of " + hotelName + ". No extra text, no introductions, just the main details."));

        CompletableFuture<String> priceFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
                "Provide only the average price range of " + hotelName + " hotel under " + price + ". No extra text."));

        CompletableFuture<String> ratingFuture = CompletableFuture.supplyAsync(() -> fetchService.getData(
                "Provide only the Google review rating of " + hotelName + " hotel. No extra text."));

        CompletableFuture<String> imageFuture = CompletableFuture.supplyAsync(() -> fetchService.searchImages(hotelName));

        // Wait for all data to be fetched
        newHotelEntity.setHotelDescription(descFuture.join());
        newHotelEntity.setHotelPrice(priceFuture.join());
        newHotelEntity.setHotelRating(ratingFuture.join());
        newHotelEntity.setHotelImage(imageFuture.join());

        hotelRepo.save(newHotelEntity);
        return newHotelEntity;
    }
}
