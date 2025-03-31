package com.example.Travel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Travel.entity.JournalEntity;
import com.example.Travel.entity.TripEntity;
import com.example.Travel.service.TripService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/trip")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class TripController {
	
	@Autowired
	private TripService tripService;
	
	@PostMapping("/location")
	public ResponseEntity<?> getLocation(@RequestBody JournalEntity journalEntity){
		try {
			ResponseEntity<?> response = tripService.getLocation(journalEntity);
			return new ResponseEntity<>(response,HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in trip location : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/explore/time/{location}")
	public ResponseEntity<?> getExploreTime(@PathVariable String location){
		try {
			ResponseEntity<?> response = tripService.getTime(location);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in trip explore time : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/explore/budget/{location}")
	public ResponseEntity<?> getExploreBudget(@PathVariable String location){
		try {
			ResponseEntity<?> response = tripService.getBudget(location);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in trip budget : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/description/{location}")
	public ResponseEntity<?> getPlaceDesc(@PathVariable String location){
		try {
			ResponseEntity<?> response = tripService.getPlaceDesc(location);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in trip description : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@GetMapping("/rating/{location}")
	public ResponseEntity<?> getPlaceRating(@PathVariable String location){
		try {
			ResponseEntity<?> response = tripService.getPlaceRating(location);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in trip rating : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/details")
	public ResponseEntity<?> getDetails(@RequestBody JournalEntity journalEntity){
		try {
			List<TripEntity> response = tripService.getDetails(journalEntity);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in trip places desc : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
