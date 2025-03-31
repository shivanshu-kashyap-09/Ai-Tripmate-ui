package com.example.Travel.service;

import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.example.Travel.entity.ImageEntity;
import com.example.Travel.repository.ImageRepo;

import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
public class FetchService {
	
	private final ChatClient chatClient;
	
	 @Autowired
	    public FetchService(ChatClient.Builder builder) {
	        this.chatClient = builder.build();
	    }
	 
	 @Autowired
		private ImageRepo imageRepo;
		
	    @Value("${spring.ai.huggingface.api-key}")
	    private String apiKey;

	    @Value("${spring.ai.huggingface.base-url}")
	    private String baseUrl;
	    
	    @Value("${pexels.api.key}")
	    private String API_KEY;

	    @Value("${pexels.api.uri}")
	    private String PEXELS_URL;
	    
	    private final RestTemplate restTemplate = new RestTemplate();
	
	public ResponseEntity<?> get(String message) {
		try {
			String response = chatClient.prompt().user(message).call().content();
            return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in fetch "+e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	public String getData(String message) {
		try {
			String response = chatClient.prompt().user(message).call().content();
			return response;
		} catch (Exception e) {
			log.error("Error occured in fetch "+e);
			return null;
		}
	}

	public List<String> extractToList(String responseText) {
	    List<String> list = new ArrayList<>();

	    if (responseText != null && !responseText.isEmpty()) {
	        String[] lines = responseText.split("\n"); // Split response into lines

	        for (String line : lines) {
	            line = line.trim();
	            if (line.matches("^[0-9]+\\.\\s+.*")) { // Match numbered list items (e.g., "1. Hotel XYZ")
	                String names = line.substring(line.indexOf(" ") + 1).trim();
	                list.add(names);
	            }
	        }
	    }
	    return list;
	}
	
	public String searchImages(String query) {
	    try {
	        // Check if the image is already stored
	        ImageEntity exploreName = imageRepo.findByExploreName(query);

	        if (exploreName == null) {
	            // If no entry exists, create a new one
	            exploreName = new ImageEntity();
	            exploreName.setExploreName(query);
	        }

	        if (exploreName.getImage() == null || exploreName.getImage().trim().isEmpty() || !isValidURL(exploreName.getImage())) {
	            // Make API request
	            HttpHeaders headers = new HttpHeaders();
	            headers.set("Authorization", API_KEY);

	            HttpEntity<String> entity = new HttpEntity<>(headers);
	            String url = PEXELS_URL + "?query=" + URLEncoder.encode(query, "UTF-8") + "&per_page=1";

	            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

	            if (response.getBody() == null || !response.getBody().containsKey("photos")) {
	                return "No images found.";
	            }

	            List<Map<String, Object>> photos = (List<Map<String, Object>>) response.getBody().get("photos");

	            if (photos.isEmpty()) {
	                return "No images found.";
	            }

	            // Extract image URL safely
	            Map<String, Object> firstPhoto = photos.get(0);
	            if (!firstPhoto.containsKey("src")) {
	                return "No valid images found.";
	            }

	            Map<String, Object> src = (Map<String, Object>) firstPhoto.get("src");
	            if (!src.containsKey("medium")) {
	                return "No valid images found.";
	            }

	            String imageUrl = src.get("medium").toString();

	            // Validate the new URL
	            if (!isValidURL(imageUrl)) {
	                return "Invalid image URL received.";
	            }

	            // Save to database
	            exploreName.setImage(imageUrl);
	            imageRepo.save(exploreName);

	            return imageUrl;
	        } else {
	            return exploreName.getImage(); // Return stored image if valid
	        }
	    } catch (Exception e) {
	        e.printStackTrace(); // Print full error for debugging
	        return "Error fetching images: " + e.getMessage();
	    }
	}

	// Utility method to validate URLs
	private boolean isValidURL(String urlString) {
	    try {
	        new URL(urlString);
	        return true;
	    } catch (MalformedURLException e) {
	        return false;
	    }
	}
	
	public ResponseEntity<byte[]> getImage(@PathVariable String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> requestBody = Collections.singletonMap("inputs", prompt);
            HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<byte[]> response = restTemplate.exchange(
                    baseUrl, HttpMethod.POST, requestEntity, byte[].class);

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(response.getBody());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Error generating image: " + e.getMessage()).getBytes());
        }
    }
}