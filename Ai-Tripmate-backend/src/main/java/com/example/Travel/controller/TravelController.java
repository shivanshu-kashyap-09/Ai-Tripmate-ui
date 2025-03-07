package com.example.Travel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Travel.entity.TravelEntity;
import com.example.Travel.service.TravelService;


@RestController
@RequestMapping("/travel")
@CrossOrigin(origins = "http://localhost:5173")
//@CrossOrigin(origins = "*")
public class TravelController {
	
	@Autowired
	private TravelService travelService;
	
	@PostMapping("/train/name")
	public ResponseEntity<?> getTrainName(@RequestBody TravelEntity travelEntity){
		try {
			ResponseEntity<?> response = travelService.getTrainName(travelEntity);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get train name "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/train/time/{trainName}")
	public ResponseEntity<?> getTrainTime(@RequestBody TravelEntity travelEntity , 
			@PathVariable String trainName){
		try {
			ResponseEntity<?> response = travelService.getTrainTiming(travelEntity, trainName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("error occured in train time "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/train/travel-time/{trainName}")
	public ResponseEntity<?> getTrainTravelTime(@RequestBody TravelEntity travelEntity ,
			@PathVariable String trainName){
		try {
			ResponseEntity<?> response = travelService.getTrainTravelTime(travelEntity, trainName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in train travel time "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/train/ticket/{trainName}")
	public ResponseEntity<?> getTrainTickets(@RequestBody TravelEntity travelEntity , 
			@PathVariable String trainName){
		try {
			ResponseEntity<?> response = travelService.getTrainTicket(travelEntity, trainName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in train tickets "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/bus/name")
	public ResponseEntity<?> getBusName(@RequestBody TravelEntity travelEntity){
		try {
			ResponseEntity<?> response = travelService.getBusName(travelEntity);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get bus names "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/bus/time/{busName}")
	public ResponseEntity<?> getBusTime(@RequestBody TravelEntity travelEntity , 
			@PathVariable String busName){
		try {
			ResponseEntity<?> response = travelService.getBusTiming(travelEntity, busName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("error occured in bus time "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/bus/travel-time/{busName}")
	public ResponseEntity<?> getBusTravelTime(@RequestBody TravelEntity travelEntity ,
			@PathVariable String busName){
		try {
			ResponseEntity<?> response = travelService.getBusTravelTime(travelEntity, busName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in bus travel time "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/bus/ticket/{busName}")
	public ResponseEntity<?> getBusTickets(@RequestBody TravelEntity travelEntity , 
			@PathVariable String busName){
		try {
			ResponseEntity<?> response = travelService.getBusTicket(travelEntity, busName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in bus tickets "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/cabe/name")
	public ResponseEntity<?> getCabeName(@RequestBody TravelEntity travelEntity){
		try {
			ResponseEntity<?> response = travelService.getCabeName(travelEntity);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get cabe name "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PostMapping("/cabe/travel-time/{cabeName}")
	public ResponseEntity<?> getCabeTravelTime(@RequestBody TravelEntity travelEntity ,
			@PathVariable String cabeName){
		try {
			ResponseEntity<?> response = travelService.getCabeTravelTime(travelEntity, cabeName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in cabe travel time "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/cabe/ticket/{cabeName}")
	public ResponseEntity<?> getCabeTickets(@RequestBody TravelEntity travelEntity , 
			@PathVariable String cabeName){
		try {
			ResponseEntity<?> response = travelService.getCabeTicket(travelEntity, cabeName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in cabe tickets "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/flight/name")
	public ResponseEntity<?> getFlightName(@RequestBody TravelEntity travelEntity){
		try {
			ResponseEntity<?> response = travelService.getFlightName(travelEntity);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get flight name "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/flight/time/{flightName}")
	public ResponseEntity<?> getFlightTime(@RequestBody TravelEntity travelEntity , 
			@PathVariable String flightName){
		try {
			ResponseEntity<?> response = travelService.getFlightTiming(travelEntity, flightName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("error occured in flight time "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/flight/travel-time/{flightName}")
	public ResponseEntity<?> getFlightTravelTime(@RequestBody TravelEntity travelEntity ,
			@PathVariable String flightName){
		try {
			ResponseEntity<?> response = travelService.getFlightTravelTime(travelEntity, flightName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in flight travel time "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/flight/ticket/{flightName}")
	public ResponseEntity<?> getFlightTickets(@RequestBody TravelEntity travelEntity , 
			@PathVariable String flightName){
		try {
			ResponseEntity<?> response = travelService.getFlightTicket(travelEntity, flightName);
			return new ResponseEntity<>(response , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in flight tickets "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
