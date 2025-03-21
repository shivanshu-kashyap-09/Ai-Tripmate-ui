package com.example.Travel.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.Travel.entity.JournalEntity;
import com.example.Travel.repository.JournalRepo;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class ImageController {

	@Autowired
	private JournalRepo journalRepo;
	
    @Value("${spring.ai.huggingface.api-key}")
    private String apiKey;

    @Value("${spring.ai.huggingface.base-url}")
    private String baseUrl;
    
    @Value("${pexels.api.key}")
    private String API_KEY;

    @Value("${pexels.api.uri}")
    private String PEXELS_URL;


    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/image/{prompt}")
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
    
    @GetMapping("/image-search")
    public ResponseEntity<?> searchImages(@RequestParam String query) {
        try {
        	JournalEntity exploreName = journalRepo.findByExploreName(query);
        	if(exploreName.getImage() == null) {
        		
        		HttpHeaders headers = new HttpHeaders();
        		headers.set("Authorization", API_KEY);
        		
        		HttpEntity<String> entity = new HttpEntity<>(headers);
        		
        		ResponseEntity<Map> response = restTemplate.exchange(PEXELS_URL + query, 
        				HttpMethod.GET, 
        				entity, 
        				Map.class);
        		
        		// Extract the "photos" array from the response
//        		List<Map<String, Object>> photos = (List<Map<String, Object>>) response.getBody().get("photos");
//        		
//        		if (photos == null || photos.isEmpty()) {
//        			return ResponseEntity.ok(Collections.singletonList("No images found."));
//        		}
        		String imageUrl = (String) response.getBody().get("photos");
        		// Extract the first 3 image URLs
//        		List<String> imageUrls = photos.stream()
//        				.limit(3) // Get only first 3 images
//        				.map(photo -> (Map<String, Object>) photo.get("src")) // Extract "src" object
//        				.map(src -> (String) src.get("medium")) // Get the "medium" size URL
//        				.collect(Collectors.toList());
        		exploreName.setImage(imageUrl);
        		return ResponseEntity.ok(imageUrl);
        	}else {
        		return ResponseEntity.ok(exploreName.getImage());
        	}

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Collections.singletonList("Error fetching images: " + e.getMessage()));
        }
    }
}
