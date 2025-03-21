package com.example.Travel.service;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RecommendedService {
	
	@Autowired
	private FetchService fetchService;
	
	public ResponseEntity<?> recommendedPlace(){
		try {
			String message = "top 10 tranding places oll over world provide places name only.";
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
	        List<String> recommendPlaces = fetchService.extractToList(response.getBody());
	        JSONObject outputJson = new JSONObject();
	        outputJson.put("recommendPlaces ", recommendPlaces);
	        return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in recommended Place : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> placeDesc(String place){
		try {
			String message = "provide me 10 words Description of "+place+" place.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in places description : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
