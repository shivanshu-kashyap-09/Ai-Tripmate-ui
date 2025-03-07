package com.example.Travel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service

public class RecommendedService {
	
	@Autowired
	private FetchService fetchService;
	
	@Autowired
	private JsonConvertService jsonConvertService;
	
	public ResponseEntity<?> recommendedPlace(){
		try {
			String message = "top 10 tranding places oll over world provide places name only ";
			ResponseEntity<?> temp = fetchService.get(message);
			ResponseEntity<?> response = jsonConvertService.jsonFormat(temp);
			return new ResponseEntity<>(temp , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in recommended Place "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> placeDesc(String place){
		try {
			String message = "provide me 5 Lines Description of "+place+" place.";
			ResponseEntity<?> response = fetchService.get(message);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Erroroccured in place description "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
