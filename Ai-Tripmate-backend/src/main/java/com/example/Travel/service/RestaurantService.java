package com.example.Travel.service;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Travel.entity.RestaurantEntity;

@Service
public class RestaurantService {
	
	@Autowired
	private FetchService fetchService;
	
	@Autowired
	private JsonConvertService jsonConvertService;
	
	public ResponseEntity<?> getName(RestaurantEntity restaurantEntity){
		try {
			String city = restaurantEntity.getCity();
			String price = restaurantEntity.getPrice();
			String message = "10 restaurant in "+city+" under "+price+" provide only restaurant name.";
			ResponseEntity<String> temp = (ResponseEntity<String>) fetchService.get(message);

	        // Extract restaurant names from the AI response
	        String responseText = temp.getBody();
	        List<String> restaurantNames = fetchService.extractToList(responseText);

	        // Convert to JSON format
	        JSONObject outputJson = new JSONObject();
	        outputJson.put("restaurant", restaurantNames);
	        System.out.println(temp);
	        System.out.println(outputJson.toString());
	        return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in restaurant name "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getPrice(String restaurantName){
		try {
			String message = "provide me only average price range of "+restaurantName+" restaurant not provide any other text.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in restaurant price "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getDesc(String restaurantName){
		try {
			String message = "Provide a concise 3-line description of " + restaurantName + 
	                 ". No extra text, no introductions, just the main details.";

			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in restaurant description "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getRating(String restaurantName){
		try {
			String message = "only provide google review rating of "+restaurantName+" restaurant not provide any other text.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in restaurant description "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
