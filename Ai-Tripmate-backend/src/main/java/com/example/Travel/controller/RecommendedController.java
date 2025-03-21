package com.example.Travel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Travel.service.RecommendedService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/recommended")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class RecommendedController {
	
	@Autowired
	private RecommendedService recommendedService;
	
	@GetMapping("/place")
	public ResponseEntity<?> recommendedPlace(){
		try {
			ResponseEntity<?> response = recommendedService.recommendedPlace();
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in recommended place : " +e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/description/{place}")
	public ResponseEntity<?> placeDesc(@PathVariable String place){
		try {
			ResponseEntity<?> response = recommendedService.placeDesc(place);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in recommended place : " +e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
