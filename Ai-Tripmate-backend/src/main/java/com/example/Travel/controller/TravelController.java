package com.example.Travel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Travel.entity.JournalEntity;
import com.example.Travel.entity.TravelEntity;
import com.example.Travel.service.TravelService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/travel")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class TravelController {
	
	@Autowired
	private TravelService travelService;
	
	@PostMapping("/train/name")
	public ResponseEntity<?> getTrainName(@RequestBody JournalEntity journalEntity){
		try {
			ResponseEntity<?> response = travelService.getTrainName(journalEntity);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get train name : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/train/time/{trainName}")
	public ResponseEntity<?> getTrainTime(@RequestBody JournalEntity journalEntity , 
			@PathVariable String trainName){
		try {
			ResponseEntity<?> response = travelService.getTrainTiming(journalEntity, trainName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("error occured in train time : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/train/travel-time/{trainName}")
	public ResponseEntity<?> getTrainTravelTime(@RequestBody JournalEntity journalEntity ,
			@PathVariable String trainName){
		try {
			ResponseEntity<?> response = travelService.getTrainTravelTime(journalEntity, trainName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in train travel time : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/train/ticket/{trainName}")
	public ResponseEntity<?> getTrainTickets(@RequestBody JournalEntity journalEntity , 
			@PathVariable String trainName){
		try {
			ResponseEntity<?> response = travelService.getTrainTicket(journalEntity, trainName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in train tickets : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/bus/name")
	public ResponseEntity<?> getBusName(@RequestBody JournalEntity journalEntity){
		try {
			ResponseEntity<?> response = travelService.getBusName(journalEntity);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get bus names : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/bus/time/{busName}")
	public ResponseEntity<?> getBusTime(@RequestBody JournalEntity journalEntity , 
			@PathVariable String busName){
		try {
			ResponseEntity<?> response = travelService.getBusTiming(journalEntity, busName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("error occured in bus time : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/bus/travel-time/{busName}")
	public ResponseEntity<?> getBusTravelTime(@RequestBody JournalEntity journalEntity ,
			@PathVariable String busName){
		try {
			ResponseEntity<?> response = travelService.getBusTravelTime(journalEntity, busName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in bus travel time : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/bus/ticket/{busName}")
	public ResponseEntity<?> getBusTickets(@RequestBody JournalEntity journalEntity , 
			@PathVariable String busName){
		try {
			ResponseEntity<?> response = travelService.getBusTicket(journalEntity, busName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in bus tickets : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/cabe/name")
	public ResponseEntity<?> getCabeName(@RequestBody JournalEntity journalEntity){
		try {
			ResponseEntity<?> response = travelService.getCabeName(journalEntity);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in cabe name : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PostMapping("/cabe/travel-time/{cabeName}")
	public ResponseEntity<?> getCabeTravelTime(@RequestBody JournalEntity journalEntity ,
			@PathVariable String cabeName){
		try {
			ResponseEntity<?> response = travelService.getCabeTravelTime(journalEntity, cabeName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in cabe travel time : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/cabe/ticket/{cabeName}")
	public ResponseEntity<?> getCabeTickets(@RequestBody JournalEntity journalEntity , 
			@PathVariable String cabeName){
		try {
			ResponseEntity<?> response = travelService.getCabeTicket(journalEntity, cabeName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in cabe tickets : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/flight/name")
	public ResponseEntity<?> getFlightName(@RequestBody JournalEntity journalEntity){
		try {
			ResponseEntity<?> response = travelService.getFlightName(journalEntity);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get flight name : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/flight/time/{flightName}")
	public ResponseEntity<?> getFlightTime(@RequestBody JournalEntity journalEntity , 
			@PathVariable String flightName){
		try {
			ResponseEntity<?> response = travelService.getFlightTiming(journalEntity, flightName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("error occured in flight time : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/flight/travel-time/{flightName}")
	public ResponseEntity<?> getFlightTravelTime(@RequestBody JournalEntity journalEntity ,
			@PathVariable String flightName){
		try {
			ResponseEntity<?> response = travelService.getFlightTravelTime(journalEntity, flightName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in flight travel time : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/flight/ticket/{flightName}")
	public ResponseEntity<?> getFlightTickets(@RequestBody JournalEntity journalEntity , 
			@PathVariable String flightName){
		try {
			ResponseEntity<?> response = travelService.getFlightTicket(journalEntity, flightName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in flight tickets : "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/details")
	public ResponseEntity<?> getDetails(@RequestBody JournalEntity journalEntity){
		try {
			List<TravelEntity> response = travelService.travelDetails(journalEntity);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occurred in travel details: ", e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
