package com.example.Travel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Travel.entity.MostVisitedPlacesEntity;
import com.example.Travel.service.MostVisitPlacesService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/most-visit")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class MostVisitPlacesController {
	
	@Autowired
	private MostVisitPlacesService mostVisitPlacesService;
	
	@GetMapping("/place")
	public ResponseEntity<?> recommendedPlace(){
		try {
			ResponseEntity<?> response = mostVisitPlacesService.recommendedPlace();
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in recommended place : " +e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/description/{place}")
	public ResponseEntity<?> placeDesc(@PathVariable String place){
		try {
			ResponseEntity<?> response = mostVisitPlacesService.placeDesc(place);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in recommended place : " +e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/details")
	public ResponseEntity<?> getDetails(){
		try {
			List<MostVisitedPlacesEntity> response = mostVisitPlacesService.getDetails();
			if(response != null) {
				return new ResponseEntity<>(response , HttpStatus.OK);
			}
		} catch (Exception e) {
			log.error("Error occured in most visit places get details : "+e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
