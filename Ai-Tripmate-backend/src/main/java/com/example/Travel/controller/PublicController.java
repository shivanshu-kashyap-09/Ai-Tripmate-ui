package com.example.Travel.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Travel.entity.PublicEntity;
import com.example.Travel.service.PublicService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "http://localhost:5173")
//@CrossOrigin(origins = "*")
public class PublicController {
	
	@Autowired
	private PublicService publicService;

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody PublicEntity user) {
		try {
			boolean isSignup = publicService.signup(user);
			if(isSignup) {
				return new ResponseEntity<>(HttpStatus.OK);
			}
		}catch(Exception e) {
			System.out.println("Error occure din signup : "+e);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Map<String, String> user) {
	    try {
	        String email = user.get("email");
	        String password = user.get("password");
	        if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
	            System.out.println("Email or password is missing.");
	            return new ResponseEntity<>("Email and password are required.", HttpStatus.BAD_REQUEST);
	        }
	        PublicEntity isLogin = publicService.login(email, password);
	        if (isLogin != null) {
	            return new ResponseEntity<>(isLogin, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Invalid credentials.", HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        System.out.println("Error occurred during login: "+e);
	        return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@PostMapping("/generate-otp")
	public ResponseEntity<?> generateOtpEmail(@RequestBody PublicEntity user) {
	    try {
	        publicService.generateAndSendOTP(user.getEmail());
	        return new ResponseEntity<>("OTP sent successfully.", HttpStatus.OK);
	        
	    } catch (MessagingException e) {
	        System.out.println("Error occurred while sending OTP: "+e);
	        return new ResponseEntity<>("Failed to send OTP. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
	    
	    } catch (Exception e) {
	        System.out.println("Unexpected error occurred: "+e);
	        return new ResponseEntity<>("An error occurred. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@PostMapping("/verify")
	public ResponseEntity<?> verified(@RequestBody Map<String, String> user) {
	    try {
	        String email = user.get("email");
	        String otp = user.get("otp");
	        if (email == null || email.isEmpty() || otp == null || otp.isEmpty()) {
	            System.out.println("Email or OTP is missing.");
	            return new ResponseEntity<>("Email or OTP cannot be empty.", HttpStatus.BAD_REQUEST);
	        }
	        
	        boolean isVerified = publicService.verifyAndSave(email, otp);
	        if (isVerified) {
	            return new ResponseEntity<>("Verified Successfully", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Incorrect OTP. Please try again.", HttpStatus.BAD_REQUEST);
	        }
	    } catch (Exception e) {
	        System.out.println("Error occurred in verification: "+e);
	        return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
}
