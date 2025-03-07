package com.example.Travel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Travel.entity.RestaurantEntity;
import com.example.Travel.service.RestaurantService;


@RestController
@RequestMapping("/resturent")
@CrossOrigin(origins = "http://localhost:5173")
//@CrossOrigin(origins = "*")
public class RestaurantController {
	
	@Autowired
	private RestaurantService restaurantService;
	
	@PostMapping("/name")
	public ResponseEntity<?> getName(@RequestBody RestaurantEntity restaurantEntity){
		try {
			ResponseEntity<?> resturant = restaurantService.getName(restaurantEntity);
			return new ResponseEntity<>(resturant , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in restaurant name "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/price/{restaurantName}")
	public ResponseEntity<?> getPrice(@PathVariable String restaurantName){
		try {
			ResponseEntity<?> restaurant = restaurantService.getPrice(restaurantName);
			return new ResponseEntity<>(restaurant , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in restaurant price "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/description/{restaurantName}")
	public ResponseEntity<?> getdesc(@PathVariable String restaurantName){
		try {
			ResponseEntity<?> restaurant = restaurantService.getDesc(restaurantName);
			return new ResponseEntity<>(restaurant , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in restaurant description "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/rating/{restaurantName}")
	public ResponseEntity<?> getRating(@PathVariable String restaurantName){
		try {
			ResponseEntity<?> restaurant = restaurantService.getRating(restaurantName);
			return new ResponseEntity<>(restaurant , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in restaurant rating "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
