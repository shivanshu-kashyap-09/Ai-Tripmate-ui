package com.example.Travel.service;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Travel.entity.TravelEntity;
import com.example.Travel.repository.TravelRepo;
@Service
public class TravelService {

	@Autowired
	private TravelRepo travelRepo;
	
	@Autowired
	private FetchService fetchService;
	
	@Autowired
	private JsonConvertService jsonConvertService;
	
	public ResponseEntity<?> getTrainName(TravelEntity travelEntity){
		try {
			String message = "get only train name from "+
		travelEntity.getFromDes()+" to "+travelEntity.getToDes()+
		" on date "+travelEntity.getDate();
			ResponseEntity<String> temp = (ResponseEntity<String>) fetchService.get(message);

	        // Extract hotel names from the AI response
	        String responseText = temp.getBody();
	        List<String> trainNames = fetchService.extractToList(responseText);

	        // Convert to JSON format
	        JSONObject outputJson = new JSONObject();
	        outputJson.put("train", trainNames);
	        System.out.println(temp);
	        System.out.println(outputJson.toString());
	        return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get train name "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getTrainTiming(TravelEntity travelEntity, String trainName){
		try {
			String message = "provide only train time (format is : start am/pm-end am/pm) of "+ trainName+" train time from "+
					travelEntity.getFromDes()+" to "+travelEntity.getToDes()+
					" on date "+travelEntity.getDate() + " by  railway officially provide me only train time do not provide any additionally text.";
			ResponseEntity<?> timing = fetchService.get(message);
			return new ResponseEntity<>(timing , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get train timing "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getTrainTravelTime(TravelEntity travelEntity , String trainName){
		try {
			String message = "provide only travel time of "+ trainName+" train travel time from "+
					travelEntity.getFromDes()+" to "+travelEntity.getToDes()+
					" on date "+travelEntity.getDate()+" by  railway officially provide me only travel time do not provide any additionally text.";
			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get train travel timing "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getTrainTicket(TravelEntity travelEntity , String trainName){
		try {
			String message = "Give only train ticket details in the format: 'Executive Class - 1090 | AC Chair Car - 755 | Chair Car - 60' " +
                    "for " + trainName + " train from " + travelEntity.getFromDes() + 
                    " to " + travelEntity.getToDes() + " on " + travelEntity.getDate() + 
                    ". Do NOT include any additional text.";
			ResponseEntity<?> temp = fetchService.get(message);
			ResponseEntity<?> response = jsonConvertService.jsonFormat(temp);
            return new ResponseEntity<>(temp, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get train train ticket "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getBusName(TravelEntity travelEntity){
		try {
			String message = "get only bus name from "+
					travelEntity.getFromDes()+" to "+travelEntity.getToDes()+
					" on date "+travelEntity.getDate();
			ResponseEntity<String> temp = (ResponseEntity<String>) fetchService.get(message);

	        // Extract hotel names from the AI response
	        String responseText = temp.getBody();
	        List<String> busNames = fetchService.extractToList(responseText);

	        // Convert to JSON format
	        JSONObject outputJson = new JSONObject();
	        outputJson.put("bus", busNames);
	        System.out.println(temp);
	        System.out.println(outputJson.toString());
	        return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get bus name "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getBusTiming(TravelEntity travelEntity, String busName){
		try {
			String message = "Provide only bus time (format is : start am/pm-end am/pm) of "+ busName+" bus from "+
					travelEntity.getFromDes()+" to "+travelEntity.getToDes()+
					" on date "+travelEntity.getDate()+"by buses officially. Provide me only bus time, do not provide any additional text.";
			ResponseEntity<?> timing = fetchService.get(message);
			return new ResponseEntity<>(timing , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get bus timing "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getBusTravelTime(TravelEntity travelEntity , String busName){
		try {
			String message = "Provide only the travel time duration for " + busName + 
	                 " bus from " + travelEntity.getFromDes() + 
	                 " to " + travelEntity.getToDes() + 
	                 " on " + travelEntity.getDate() + 
	                 ". Return only the duration in hours and minutes (e.g., '4h 30m') without any additional text.";

			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get bus travel timing "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getBusTicket(TravelEntity travelEntity , String busName){
		try {
			String message = "Provide only the ticket prices for " + busName + 
	                 " bus from " + travelEntity.getFromDes() + 
	                 " to " + travelEntity.getToDes() + 
	                 " on " + travelEntity.getDate() + 
	                 ". Return only the ticket classes and their prices in the format: 'Class - Price' without any additional text.";
			ResponseEntity<?> temp = fetchService.get(message);
			ResponseEntity<?> response = jsonConvertService.jsonFormat(temp);
            return new ResponseEntity<>(temp, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get bus ticket "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getCabeName(TravelEntity travelEntity){
		try {
			String message = "Provide only the cab name for a ride from " + 
	                 travelEntity.getFromDes() + " to " + travelEntity.getToDes() + 
	                 " on " + travelEntity.getDate() + 
	                 ". Do not include any additional text.";

			ResponseEntity<String> temp = (ResponseEntity<String>) fetchService.get(message);

	        // Extract hotel names from the AI response
	        String responseText = temp.getBody();
	        List<String> cabeNames = fetchService.extractToList(responseText);

	        // Convert to JSON format
	        JSONObject outputJson = new JSONObject();
	        outputJson.put("cabe", cabeNames);
	        System.out.println(temp);
	        System.out.println(outputJson.toString());
	        return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get cabe name "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getCabeTravelTime(TravelEntity travelEntity , String cabeName){
		try {
			String message = "Provide only the travel time for " + cabeName +  
	                 " cab from " + travelEntity.getFromDes() +  
	                 " to " + travelEntity.getToDes() +  
	                 " on " + travelEntity.getDate() +  
	                 ". Do not include any additional text.";

			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get cabe travel time "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getCabeTicket(TravelEntity travelEntity , String cabeName){
		try {
			String message = "Provide only the ticket details for " + cabeName +  
	                 " cab from " + travelEntity.getFromDes() +  
	                 " to " + travelEntity.getToDes() +  
	                 " on " + travelEntity.getDate() +  
	                 ". Do not include any additional text.";

			ResponseEntity<?> temp = fetchService.get(message);
			ResponseEntity<?> response = jsonConvertService.jsonFormat(temp);
            return new ResponseEntity<>(temp, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get train ticket "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getFlightName(TravelEntity travelEntity) {
		try {
			String message = "Provide only the flight names for travel from " +  
	                 travelEntity.getFromDes() + " to " +  
	                 travelEntity.getToDes() +  
	                 " on " + travelEntity.getDate() +  
	                 ". Do not include any additional text.";

			ResponseEntity<String> temp = (ResponseEntity<String>) fetchService.get(message);

	        // Extract hotel names from the AI response
	        String responseText = temp.getBody();
	        List<String> flightNames = fetchService.extractToList(responseText);

	        // Convert to JSON format
	        JSONObject outputJson = new JSONObject();
	        outputJson.put("flight", flightNames);
	        System.out.println(temp);
	        System.out.println(outputJson.toString());
	        return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get flight name "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getFlightTiming(TravelEntity travelEntity, String flightName){
		try {
			String message = "Provide only the timing for " + flightName + " flight from " +  
	                 travelEntity.getFromDes() + " to " +  
	                 travelEntity.getToDes() +  
	                 " on " + travelEntity.getDate() +  
	                 ". Do not include any additional text.";

			ResponseEntity<?> timing = fetchService.get(message);
			return new ResponseEntity<>(timing , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get flight timing "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getFlightTravelTime(TravelEntity travelEntity , String flightName){
		try {
			String message = "Provide only the travel time for " + flightName +  
	                 " train from " + travelEntity.getFromDes() +  
	                 " to " + travelEntity.getToDes() +  
	                 " on " + travelEntity.getDate() +  
	                 ". Do not include any additional text.";

			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time , HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get flight travel timing "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getFlightTicket(TravelEntity travelEntity , String flightName){
		try {
			String message = "Provide only the ticket prices for " + flightName +  
	                 " flight from " + travelEntity.getFromDes() +  
	                 " to " + travelEntity.getToDes() +  
	                 " on " + travelEntity.getDate() +  
	                 ". Do not include any additional text.";

			ResponseEntity<?> temp = fetchService.get(message);
			ResponseEntity<?> response = jsonConvertService.jsonFormat(temp);
            return new ResponseEntity<>(temp, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in get flight tickets "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
