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

import com.example.Travel.entity.HotelEntity;
import com.example.Travel.entity.JournalEntity;
import com.example.Travel.service.FetchService;
import com.example.Travel.service.HotelService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/hotel")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class HotelController {
	
	@Autowired
	private HotelService hotelService;
	
	
	@PostMapping("/name")
	public ResponseEntity<?> getName(@RequestBody JournalEntity journalEntity) {
		try {
			ResponseEntity<?> hotelName = hotelService.getHotelsName(journalEntity);
			return new ResponseEntity<>(hotelName , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in hotel names : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/price/{hotelName}")
	public ResponseEntity<?> getPrices(@PathVariable String hotelName){
		try {
			ResponseEntity<?> hotelPrice = hotelService.getHotelsPrice(hotelName);
			return new ResponseEntity<>(hotelPrice , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in hotel price : "+ e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/description/{hotelName}")
	public ResponseEntity<?> getDesc(@PathVariable String hotelName){
		try {
			ResponseEntity<?> hotelDesc = hotelService.getHotelsDesc(hotelName);
			return new ResponseEntity<>(hotelDesc , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in hotel descrition : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/rating/{hotelName}")
	public ResponseEntity<?> getRating(@PathVariable String hotelName){
		try {
			ResponseEntity<?> hotelRating = hotelService.getHotelsRating(hotelName);
			return new ResponseEntity<>(hotelRating , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in hotel rating : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/details")
	public ResponseEntity<?> getDetails(@RequestBody JournalEntity journalEntity) {
		try {
			
			List<HotelEntity> response = hotelService.getDetails(journalEntity);
			if(response != null) {
				return new ResponseEntity<>(response , HttpStatus.OK);
			}
		} catch (Exception e) {
			log.error("Error occured in hotel rating : "+e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
