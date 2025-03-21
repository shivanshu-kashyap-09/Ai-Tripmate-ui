package com.example.Travel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Travel.entity.AuthUser;
import com.example.Travel.repository.AuthRepo;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import java.util.Optional;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class GoogleAuthController {
	
	@Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String CLIENT_ID;
	
	@Autowired
	private AuthRepo authRepo;
    
    @PostMapping("/google")
    public ResponseEntity<?> verifyGoogleToken(@RequestBody TokenRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(), new JacksonFactory()
            ).setAudience(Collections.singletonList(CLIENT_ID)).build();

            GoogleIdToken idToken = verifier.verify(request.getToken());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String picture = (String) payload.get("picture");

                Optional<AuthUser> existingUser = authRepo.findByEmail(email);
                AuthUser user;

                if (existingUser.isPresent()) {
                    user = existingUser.get();
                    user.setName(name);
                    user.setPicture(picture);
                } else {
                    user = new AuthUser(email, name, picture);
                }

                authRepo.save(user);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(401).body("Invalid ID token.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Authentication failed.");
        }
    }

    static class TokenRequest {
        private String token;
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
    }
}
