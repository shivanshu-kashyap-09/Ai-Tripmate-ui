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
import com.example.Travel.repository.TravelRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TravelService {

	@Autowired
	private FetchService fetchService;

	@Autowired
	private TravelRepo travelRepo;

	public ResponseEntity<?> getTrainName(JournalEntity journalEntity) {
		try {
			String message = "get only train name from " + journalEntity.getFromDes() + " to " + journalEntity.getToDes()
					+ " on date " + journalEntity.getDate();
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

	public ResponseEntity<?> getTrainTiming(JournalEntity journalEntity, String trainName) {
		try {
			String message = "provide only train time (format is : start am/pm-end am/pm) of " + trainName
					+ " train time from " + journalEntity.getFromDes() + " to " + journalEntity.getToDes() + " on date "
					+ journalEntity.getDate()
					+ " by  railway officially provide me only train time do not provide any additionally text.";
			ResponseEntity<?> timing = fetchService.get(message);
			return new ResponseEntity<>(timing, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get train timing : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getTrainTravelTime(JournalEntity journalEntity, String trainName) {
		try {
			String message = "provide only travel time of " + trainName + " train travel time from "
					+ journalEntity.getFromDes() + " to " + journalEntity.getToDes() + " on date "
					+ journalEntity.getDate()
					+ " by  railway officially provide me only travel time do not provide any additionally text.";
			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get train travel time : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getTrainTicket(JournalEntity journalEntity, String trainName) {
		try {
			String message = "Give only train ticket details in the format: 'Executive Class - 1090 | AC Chair Car - 755 | Chair Car - 60' "
					+ "for " + trainName + " train from " + journalEntity.getFromDes() + " to " + journalEntity.getToDes()
					+ " on " + journalEntity.getDate() + ". Do NOT include any additional text.";
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

	public ResponseEntity<?> getBusName(JournalEntity journalEntity) {
		try {
			String message = "get only bus name from " + journalEntity.getFromDes() + " to " + journalEntity.getToDes()
					+ " on date " + journalEntity.getDate();
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

	public ResponseEntity<?> getBusTiming(JournalEntity journalEntity, String busName) {
		try {
			String message = "Provide only bus time (format is : start am/pm-end am/pm) of " + busName + " bus from "
					+ journalEntity.getFromDes() + " to " + journalEntity.getToDes() + " on date "
					+ journalEntity.getDate()
					+ "by buses officially. Provide me only bus time, do not provide any additional text.";
			ResponseEntity<?> timing = fetchService.get(message);
			return new ResponseEntity<>(timing, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get bus timing " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getBusTravelTime(JournalEntity journalEntity, String busName) {
		try {
			String message = "Provide only the travel time duration for " + busName + " bus from "
					+ journalEntity.getFromDes() + " to " + journalEntity.getToDes() + " on " + journalEntity.getDate()
					+ ". Return only the duration in hours and minutes (e.g., '4h 30m') without any additional text.";
			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get bus travel timing : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getBusTicket(JournalEntity journalEntity, String busName) {
		try {
			String message = "Provide only the ticket prices for " + busName + " bus from " + journalEntity.getFromDes()
					+ " to " + journalEntity.getToDes() + " on " + journalEntity.getDate()
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

	public ResponseEntity<?> getCabeName(JournalEntity journalEntity) {
		try {
			String message = "Provide only the cab name for a ride from " + journalEntity.getFromDes() + " to "
					+ journalEntity.getToDes() + " on " + journalEntity.getDate()
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

	public ResponseEntity<?> getCabeTravelTime(JournalEntity journalEntity, String cabeName) {
		try {
			String message = "Provide only the travel time for " + cabeName + " cab from " + journalEntity.getFromDes()
					+ " to " + journalEntity.getToDes() + " on " + journalEntity.getDate()
					+ ". Do not include any additional text.";
			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get cabe travel time : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getCabeTicket(JournalEntity journalEntity, String cabeName) {
		try {
			String message = "Provide only the ticket details for " + cabeName + " cab from "
					+ journalEntity.getFromDes() + " to " + journalEntity.getToDes() + " on " + journalEntity.getDate()
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

	public ResponseEntity<?> getFlightName(JournalEntity journalEntity) {
		try {
			String message = "Provide only the flight names for travel from " + journalEntity.getFromDes() + " to "
					+ journalEntity.getToDes() + " on " + journalEntity.getDate()
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

	public ResponseEntity<?> getFlightTiming(JournalEntity journalEntity, String flightName) {
		try {
			String message = "Provide only the timing for " + flightName + " flight from " + journalEntity.getFromDes()
					+ " to " + journalEntity.getToDes() + " on " + journalEntity.getDate()
					+ ". Do not include any additional text.";

			ResponseEntity<?> timing = fetchService.get(message);
			return new ResponseEntity<>(timing, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get flight timing : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getFlightTravelTime(JournalEntity journalEntity, String flightName) {
		try {
			String message = "Provide only the travel time for " + flightName + " train from "
					+ journalEntity.getFromDes() + " to " + journalEntity.getToDes() + " on " + journalEntity.getDate()
					+ ". Do not include any additional text.";

			ResponseEntity<?> time = fetchService.get(message);
			return new ResponseEntity<>(time, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error occured in get flight travel timing : " + e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getFlightTicket(JournalEntity journalEntity, String flightName) {
		try {
			String message = "Provide only the ticket prices for " + flightName + " flight from "
					+ journalEntity.getFromDes() + " to " + journalEntity.getToDes() + " on " + journalEntity.getDate()
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

	 public List<TravelEntity> travelDetails(JournalEntity journalEntity) {
	        try {
	            List<String> travelNames = new ArrayList<>();
	            travelNames.addAll(fetchService.extractToList(fetchService.getData(
	                "get only train name from " + journalEntity.getFromDes() + " to " + journalEntity.getToDes() +
	                " on date " + journalEntity.getDate())));
	            travelNames.addAll(fetchService.extractToList(fetchService.getData(
	                "get only bus name from " + journalEntity.getFromDes() + " to " + journalEntity.getToDes() +
	                " on date " + journalEntity.getDate())));
	            travelNames.addAll(fetchService.extractToList(fetchService.getData(
	                "Provide only the cab name for a ride from " + journalEntity.getFromDes() + " to " +
	                journalEntity.getToDes() + " on " + journalEntity.getDate() + ". Do not include any additional text.")));
	            travelNames.addAll(fetchService.extractToList(fetchService.getData(
	                "Provide only the flight names for travel from " + journalEntity.getFromDes() + " to " +
	                journalEntity.getToDes() + " on " + journalEntity.getDate() + ". Do not include any additional text.")));

	            List<TravelEntity> existingTravel = travelRepo.findByTravelName(travelNames);
	            Map<String, TravelEntity> travelMap = existingTravel.stream()
	                .collect(Collectors.toMap(TravelEntity::getTravelName, t -> t));

	            List<CompletableFuture<TravelEntity>> futures = travelNames.parallelStream()
	                .map(travelName -> CompletableFuture.supplyAsync(() ->
	                    travelMap.containsKey(travelName)
	                        ? validateAndUpdateTravelData(travelMap.get(travelName), journalEntity)
	                        : fetchAndSaveTravelData(travelName, journalEntity)
	                )).collect(Collectors.toList());

	            return futures.stream().map(CompletableFuture::join).collect(Collectors.toList());
	        } catch (Exception e) {
	            log.error("Error occurred in travel details: ", e);
	            return Collections.emptyList();
	        }
	    }

	    private TravelEntity validateAndUpdateTravelData(TravelEntity travel, JournalEntity journalEntity) {
	        boolean needsUpdate = false;
	        CompletableFuture<String> time = null, travelTime = null, ticket = null, image = null;

	        if (travel.getTravelDuration() == null || travel.getTravelDuration().trim().isEmpty()) {
	            needsUpdate = true;
	            time = fetchAsyncData(travel.getTravelName(), journalEntity, "time");
	        }

	        if (travel.getTravelStratTime() == null || travel.getTravelStratTime().trim().isEmpty()) {
	            needsUpdate = true;
	            travelTime = fetchAsyncData(travel.getTravelName(), journalEntity, "travelTime");
	        }

	        if (travel.getTravelTicket() == null || travel.getTravelTicket().trim().isEmpty()) {
	            needsUpdate = true;
	            ticket = fetchAsyncData(travel.getTravelName(), journalEntity, "ticket");
	        }

	        if (travel.getTravelImage() == null || travel.getTravelImage().trim().isEmpty()) {
	            needsUpdate = true;
	            image = fetchValidImageUrlAsync(travel.getTravelName());
	        }

	        if (needsUpdate) {
	            CompletableFuture.allOf(time, travelTime, ticket, image).join();
	            travel.setTravelDuration(time != null ? time.join() : travel.getTravelDuration());
	            travel.setTravelStratTime(travelTime != null ? travelTime.join() : travel.getTravelStratTime());
	            travel.setTravelTicket(ticket != null ? ticket.join() : travel.getTravelTicket());
	            travel.setTravelImage(image != null ? image.join() : travel.getTravelImage());

	             travelRepo.save(travel);
	        }
	        return travel;
	    }

	    private TravelEntity fetchAndSaveTravelData(String travelName, JournalEntity journalEntity) {
	        TravelEntity newTravelEntity = new TravelEntity();
	        newTravelEntity.setTravelName(travelName);

	        CompletableFuture<String> time = fetchAsyncData(travelName, journalEntity, "time");
	        CompletableFuture<String> travelTime = fetchAsyncData(travelName, journalEntity, "travelTime");
	        CompletableFuture<String> ticket = fetchAsyncData(travelName, journalEntity, "ticket");
	        CompletableFuture<String> image = fetchValidImageUrlAsync(travelName);

	        CompletableFuture.allOf(time, travelTime, ticket, image).join();

	        newTravelEntity.setTravelDuration(time.join());
	        newTravelEntity.setTravelStratTime(travelTime.join());
	        newTravelEntity.setTravelTicket(ticket.join());
	        newTravelEntity.setTravelImage(image.join());

	         travelRepo.save(newTravelEntity); 
	        return newTravelEntity;
	    }

	    private CompletableFuture<String> fetchAsyncData(String travelName, JournalEntity journalEntity, String queryType) {
	        String query = switch (queryType) {
	            case "time" -> "provide only time (format is: start am/pm-end am/pm) of " + travelName +
	                           " from " + journalEntity.getFromDes() + " to " + journalEntity.getToDes() +
	                           " on " + journalEntity.getDate() + ". Do NOT include any additional text.";
	            case "travelTime" -> "provide only travel time of " + travelName +
	                                 " from " + journalEntity.getFromDes() + " to " + journalEntity.getToDes() +
	                                 " on " + journalEntity.getDate() + ". Do NOT include any additional text.";
	            case "ticket" -> "Give only ticket details in the format: 'Executive Class - 1090 | AC Chair Car - 755 | Chair Car - 60' " +
	                             "for " + travelName + " from " + journalEntity.getFromDes() + " to " + journalEntity.getToDes() +
	                             " on " + journalEntity.getDate() + ". Do NOT include any additional text.";
	            default -> throw new IllegalArgumentException("Invalid query type: " + queryType);
	        };
	        return CompletableFuture.supplyAsync(() -> fetchService.getData(query));
	    }

	    private CompletableFuture<String> fetchValidImageUrlAsync(String travelName) {
	        return CompletableFuture.supplyAsync(() -> fetchValidImageUrl(travelName));
	    }

	    private String fetchValidImageUrl(String travelName) {
	        String imageUrl = fetchService.searchImages(travelName);
	        if (imageUrl == null || !imageUrl.matches("^(http|https)://.*\\.(jpeg|jpg|png|gif)$")) {
	            log.error("Invalid image URL received for " + travelName + ": " + imageUrl);
	            return null;
	        }
	        return imageUrl;
	    }
	}
