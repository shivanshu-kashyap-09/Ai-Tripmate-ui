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
import com.example.Travel.entity.RestaurantEntity;
import com.example.Travel.service.RestaurantService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/resturent")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class RestaurantController {
	
	@Autowired
	private RestaurantService restaurantService;
	
	@PostMapping("/name")
	public ResponseEntity<?> getName(@RequestBody JournalEntity journalEntity){
		try {
			ResponseEntity<?> resturant = restaurantService.getName(journalEntity);
			return new ResponseEntity<>(resturant , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant name : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/price/{restaurantName}")
	public ResponseEntity<?> getPrice(@PathVariable String restaurantName){
		try {
			ResponseEntity<?> restaurant = restaurantService.getPrice(restaurantName);
			return new ResponseEntity<>(restaurant , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant price : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/description/{restaurantName}")
	public ResponseEntity<?> getdesc(@PathVariable String restaurantName){
		try {
			ResponseEntity<?> restaurant = restaurantService.getDesc(restaurantName);
			return new ResponseEntity<>(restaurant , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant description : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/rating/{restaurantName}")
	public ResponseEntity<?> getRating(@PathVariable String restaurantName){
		try {
			ResponseEntity<?> restaurant = restaurantService.getRating(restaurantName);
			return new ResponseEntity<>(restaurant , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in restaurant rating : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/details")
	public ResponseEntity<?> getDetails(@RequestBody JournalEntity JournalEntity) {
		try {
			List<RestaurantEntity> response = restaurantService.getDetails(JournalEntity);
			if(response != null) {
				return new ResponseEntity<>(response , HttpStatus.OK);
			}
		} catch (Exception e) {
			log.error("Error Occured in fetch restaurant Details : ",e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
