package com.example.Travel.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Travel.entity.HotelEntity;
import com.example.Travel.repository.HotelRepo;

@Service
public class HotelService {
	
	@Autowired
	private FetchService fetchService;
	
	@Autowired
	private JsonConvertService jsonConvertService;
	
	@Autowired
	private HotelRepo hotelRepo;
	 
	public ResponseEntity<?> getHotelsName(HotelEntity hotelEntity) {
		try {
			String city = hotelEntity.getCity();
			String price = hotelEntity.getPrice();
			String message = "10 hotel in "+city+" under "+price+" only provide a hotel name";
			ResponseEntity<String> temp = (ResponseEntity<String>) fetchService.get(message);

	        // Extract hotel names from the AI response
	        String responseText = temp.getBody();
	        List<String> hotelNames = fetchService.extractToList(responseText);

	        // Convert to JSON format
	        JSONObject outputJson = new JSONObject();
	        outputJson.put("hotels", hotelNames);
	        return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in hotel "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getHotelsPrice(String hotelName){
		try {
			String message = "provide me only average price range of "+hotelName+" hotel not provide any other text.";
			ResponseEntity<?> response = fetchService.get(message);
//			hotelRepo.save(response);
			return new ResponseEntity<>(response.getBody() , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in hotel price "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getHotelsDesc(String hotelName){
		try {
			String message = "Provide a concise 3-line description of " + hotelName + 
	                 ". No extra text, no introductions, just the main details.";

			ResponseEntity<?> response = fetchService.get(message);
//			hotelRepo.save(response);
			System.out.println(response);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in hotel description "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getHotelsRating(String hotelName){
		try {
			String message = "only provide google review rating of "+hotelName+" hotel not provide any other text.";
			ResponseEntity<?> response = fetchService.get(message);
//			hotelRepo.save(response);
			return new ResponseEntity<>(response.getBody() , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in hotel rating "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
