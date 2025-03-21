package com.example.Travel.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Travel.entity.JournalEntity;
import com.example.Travel.entity.TravelEntity;
import com.example.Travel.repository.JournalRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TravelService {

	@Autowired
	private FetchService fetchService;

	@Autowired
	private JournalRepo journalRepo;

	public ResponseEntity<?> getTrainName(TravelEntity travelEntity) {
		try {
			String message = "get only train name from " + travelEntity.getFromDes() + " to " + travelEntity.getToDes()
					+ " on date " + travelEntity.getDate();
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
			List<String> trainNames = fetchService.extractToList(response.getBody());
			JSONObject outputJson = new JSONObject();
			outputJson.put("trainName", trainNames);
			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get train name : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getTrainTiming(TravelEntity travelEntity, String trainName) {
		try {
			String message = "provide only train time (format is : start am/pm-end am/pm) of " + trainName
					+ " train time from " + travelEntity.getFromDes() + " to " + travelEntity.getToDes() + " on date "
					+ travelEntity.getDate()
					+ " by  railway officially provide me only train time do not provide any additionally text.";
			ResponseEntity<?> timing = fetchService.get(message);
			return new ResponseEntity<>(timing, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get train timing : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getTrainTravelTime(TravelEntity travelEntity, String trainName) {
		try {
			String message = "provide only travel time of " + trainName + " train travel time from "
					+ travelEntity.getFromDes() + " to " + travelEntity.getToDes() + " on date "
					+ travelEntity.getDate()
					+ " by  railway officially provide me only travel time do not provide any additionally text.";
			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get train travel time : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getTrainTicket(TravelEntity travelEntity, String trainName) {
		try {
			String message = "Give only train ticket details in the format: 'Executive Class - 1090 | AC Chair Car - 755 | Chair Car - 60' "
					+ "for " + trainName + " train from " + travelEntity.getFromDes() + " to " + travelEntity.getToDes()
					+ " on " + travelEntity.getDate() + ". Do NOT include any additional text.";
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
			List<String> trianTickets = fetchService.extractToList(response.getBody());
			JSONObject outputJson = new JSONObject();
			outputJson.put("trianTickets", trianTickets);
			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get train train ticket : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getBusName(TravelEntity travelEntity) {
		try {
			String message = "get only bus name from " + travelEntity.getFromDes() + " to " + travelEntity.getToDes()
					+ " on date " + travelEntity.getDate();
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
			List<String> busNames = fetchService.extractToList(response.getBody());
			JSONObject outputJson = new JSONObject();
			outputJson.put("busName", busNames);
			log.error(outputJson.toString());
			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get bus name : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getBusTiming(TravelEntity travelEntity, String busName) {
		try {
			String message = "Provide only bus time (format is : start am/pm-end am/pm) of " + busName + " bus from "
					+ travelEntity.getFromDes() + " to " + travelEntity.getToDes() + " on date "
					+ travelEntity.getDate()
					+ "by buses officially. Provide me only bus time, do not provide any additional text.";
			ResponseEntity<?> timing = fetchService.get(message);
			return new ResponseEntity<>(timing, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get bus timing " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getBusTravelTime(TravelEntity travelEntity, String busName) {
		try {
			String message = "Provide only the travel time duration for " + busName + " bus from "
					+ travelEntity.getFromDes() + " to " + travelEntity.getToDes() + " on " + travelEntity.getDate()
					+ ". Return only the duration in hours and minutes (e.g., '4h 30m') without any additional text.";
			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get bus travel timing : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getBusTicket(TravelEntity travelEntity, String busName) {
		try {
			String message = "Provide only the ticket prices for " + busName + " bus from " + travelEntity.getFromDes()
					+ " to " + travelEntity.getToDes() + " on " + travelEntity.getDate()
					+ ". Return only the ticket classes and their prices in the format: 'Class - Price' without any additional text.";
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
			List<String> busTickets = fetchService.extractToList(response.getBody());
			JSONObject outputJson = new JSONObject();
			outputJson.put("busTIckets", busTickets);
			log.error(outputJson.toString());
			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get bus ticket : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getCabeName(TravelEntity travelEntity) {
		try {
			String message = "Provide only the cab name for a ride from " + travelEntity.getFromDes() + " to "
					+ travelEntity.getToDes() + " on " + travelEntity.getDate()
					+ ". Do not include any additional text.";

			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
			List<String> cabeNames = fetchService.extractToList(response.getBody());
			JSONObject outputJson = new JSONObject();
			outputJson.put("cabeName", cabeNames);
			log.error(outputJson.toString());
			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get cabe name : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getCabeTravelTime(TravelEntity travelEntity, String cabeName) {
		try {
			String message = "Provide only the travel time for " + cabeName + " cab from " + travelEntity.getFromDes()
					+ " to " + travelEntity.getToDes() + " on " + travelEntity.getDate()
					+ ". Do not include any additional text.";
			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get cabe travel time : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getCabeTicket(TravelEntity travelEntity, String cabeName) {
		try {
			String message = "Provide only the ticket details for " + cabeName + " cab from "
					+ travelEntity.getFromDes() + " to " + travelEntity.getToDes() + " on " + travelEntity.getDate()
					+ ". Do not include any additional text.";
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
			List<String> busNames = fetchService.extractToList(response.getBody());
			JSONObject outputJson = new JSONObject();
			outputJson.put("busName", busNames);
			log.error(outputJson.toString());
			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get cabe ticket : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getFlightName(TravelEntity travelEntity) {
		try {
			String message = "Provide only the flight names for travel from " + travelEntity.getFromDes() + " to "
					+ travelEntity.getToDes() + " on " + travelEntity.getDate()
					+ ". Do not include any additional text.";

			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
			List<String> flightNames = fetchService.extractToList(response.getBody());

			// Convert to JSON format
			JSONObject outputJson = new JSONObject();
			outputJson.put("flightNames", flightNames);
			log.error(outputJson.toString());
			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get flight name : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getFlightTiming(TravelEntity travelEntity, String flightName) {
		try {
			String message = "Provide only the timing for " + flightName + " flight from " + travelEntity.getFromDes()
					+ " to " + travelEntity.getToDes() + " on " + travelEntity.getDate()
					+ ". Do not include any additional text.";

			ResponseEntity<?> timing = fetchService.get(message);
			return new ResponseEntity<>(timing, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get flight timing : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getFlightTravelTime(TravelEntity travelEntity, String flightName) {
		try {
			String message = "Provide only the travel time for " + flightName + " train from "
					+ travelEntity.getFromDes() + " to " + travelEntity.getToDes() + " on " + travelEntity.getDate()
					+ ". Do not include any additional text.";

			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get flight travel timing : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getFlightTicket(TravelEntity travelEntity, String flightName) {
		try {
			String message = "Provide only the ticket prices for " + flightName + " flight from "
					+ travelEntity.getFromDes() + " to " + travelEntity.getToDes() + " on " + travelEntity.getDate()
					+ ". Do not include any additional text.";
			ResponseEntity<String> response = (ResponseEntity<String>) fetchService.get(message);
			List<String> busNames = fetchService.extractToList(response.getBody());
			JSONObject outputJson = new JSONObject();
			outputJson.put("busName", busNames);
			log.error(outputJson.toString());
			return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get flight tickets : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public List<JournalEntity> travelDetails(TravelEntity travelEntity) {
	    try {
	        List<String> travelNames = new ArrayList<>();
	        travelNames.addAll(fetchService.extractToList(fetchService.getData(
	            "get only train name from " + travelEntity.getFromDes() + " to " + travelEntity.getToDes() +
	            " on date " + travelEntity.getDate())));
	        travelNames.addAll(fetchService.extractToList(fetchService.getData(
	            "get only bus name from " + travelEntity.getFromDes() + " to " + travelEntity.getToDes() +
	            " on date " + travelEntity.getDate())));
	        travelNames.addAll(fetchService.extractToList(fetchService.getData(
	            "Provide only the cab name for a ride from " + travelEntity.getFromDes() + " to " +
	            travelEntity.getToDes() + " on " + travelEntity.getDate() + ". Do not include any additional text.")));
	        travelNames.addAll(fetchService.extractToList(fetchService.getData(
	            "Provide only the flight names for travel from " + travelEntity.getFromDes() + " to " +
	            travelEntity.getToDes() + " on " + travelEntity.getDate() + ". Do not include any additional text.")));

	        List<JournalEntity> existingTravel = journalRepo.findByExploreNameIn(travelNames);
	        Map<String, JournalEntity> travelMap = existingTravel.stream()
	            .collect(Collectors.toMap(JournalEntity::getExploreName, t -> t));

	        List<CompletableFuture<JournalEntity>> futures = travelNames.parallelStream()
	            .map(travelName -> CompletableFuture.supplyAsync(() ->
	                travelMap.containsKey(travelName)
	                    ? validateAndUpdateTravelData(travelMap.get(travelName), travelEntity)
	                    : fetchAndSaveTravelData(travelName, travelEntity)
	            )).collect(Collectors.toList());

	        return futures.stream().map(CompletableFuture::join).collect(Collectors.toList());
	    } catch (Exception e) {
	        log.error("Error occurred in travel details: ", e);
	        return Collections.emptyList();
	    }
	}

	private JournalEntity validateAndUpdateTravelData(JournalEntity travelName, TravelEntity travelEntity) {
	    boolean needsUpdate = false;
	    CompletableFuture<String> time = null, travelTime = null, ticket = null;

	    if (travelName.getTime() == null || travelName.getTime().trim().isEmpty()) {
	        needsUpdate = true;
	        time = fetchAsyncData(travelName.getExploreName(), travelEntity, "time");
	    }

	    if (travelName.getTravelTime() == null || travelName.getTravelTime().trim().isEmpty()) {
	        needsUpdate = true;
	        travelTime = fetchAsyncData(travelName.getExploreName(), travelEntity, "travelTime");
	    }

	    if (travelName.getTicket() == null || travelName.getTicket().trim().isEmpty()) {
	        needsUpdate = true;
	        ticket = fetchAsyncData(travelName.getExploreName(), travelEntity, "ticket");
	    }

	    if (needsUpdate) {
	        CompletableFuture.allOf(time, travelTime, ticket).join();
	        travelName.setTime(time != null ? time.join() : travelName.getTime());
	        travelName.setTravelTime(travelTime != null ? travelTime.join() : travelName.getTravelTime());
	        travelName.setTicket(ticket != null ? ticket.join() : travelName.getTicket());
	        journalRepo.save(travelName);
	    }
	    return travelName;
	}

	private JournalEntity fetchAndSaveTravelData(String travelName, TravelEntity travelEntity) {
	    JournalEntity newJournalEntity = new JournalEntity();
	    newJournalEntity.setExploreName(travelName);

	    CompletableFuture<String> time = fetchAsyncData(travelName, travelEntity, "time");
	    CompletableFuture<String> travelTime = fetchAsyncData(travelName, travelEntity, "travelTime");
	    CompletableFuture<String> ticket = fetchAsyncData(travelName, travelEntity, "ticket");

	    CompletableFuture.allOf(time, travelTime, ticket).join();

	    newJournalEntity.setTime(time.join());
	    newJournalEntity.setTravelTime(travelTime.join());
	    newJournalEntity.setTicket(ticket.join());

	    journalRepo.save(newJournalEntity);
	    return newJournalEntity;
	}

	private CompletableFuture<String> fetchAsyncData(String travelName, TravelEntity travelEntity, String queryType) {
	    String query = switch (queryType) {
	        case "time" -> "provide only time (format is : start am/pm-end am/pm) of " + travelName +
	                       " from " + travelEntity.getFromDes() + " to " + travelEntity.getToDes() +
	                       " on " + travelEntity.getDate() + ". Do NOT include any additional text.";
	        case "travelTime" -> "provide only travel time of " + travelName +
	                             " from " + travelEntity.getFromDes() + " to " + travelEntity.getToDes() +
	                             " on " + travelEntity.getDate() + ". Do NOT include any additional text.";
	        case "ticket" -> "Give only ticket details in the format: 'Executive Class - 1090 | AC Chair Car - 755 | Chair Car - 60' " +
	                         "for " + travelName + " from " + travelEntity.getFromDes() + " to " + travelEntity.getToDes() +
	                         " on " + travelEntity.getDate() + ". Do NOT include any additional text.";
	        default -> throw new IllegalArgumentException("Invalid query type: " + queryType);
	    };
	    return CompletableFuture.supplyAsync(() -> fetchService.getData(query));
	}

}
