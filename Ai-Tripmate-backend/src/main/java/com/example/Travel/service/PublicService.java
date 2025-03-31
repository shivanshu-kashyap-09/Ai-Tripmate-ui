package com.example.Travel.service;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;

import com.example.Travel.entity.FeedbackEntity;
import com.example.Travel.entity.PublicEntity;
import com.example.Travel.repository.FeedbackRepo;
import com.example.Travel.repository.PublicRepo;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PublicService {

	@Autowired
	private PublicRepo publicRepo;

	@Autowired
	private FeedbackRepo feedbackRepo;

	@Autowired
	private JavaMailSender javaMailSender;
	
	@Value("${spring.feedback.email}")
	private String EMAIL;

	private static final int OTP_VALIDATION = 5;

	private ConcurrentHashMap<String, String> otpStorage = new ConcurrentHashMap<>();
	private ConcurrentHashMap<String, LocalDateTime> otpTimestampStorage = new ConcurrentHashMap<>();

	public boolean signup(PublicEntity user) {
		try {
			String email = user.getEmail();
			if (email != null) {
				user.setVerified(true);
				if (user != null) {
					publicRepo.save(user);
					return true;
				}
			}
		} catch (Exception e) {
			log.error("Error occured in signup : " + e);
		}
		return false;
	}

	public PublicEntity login(String email, String password) {
		try {
			PublicEntity userEmail = publicRepo.getByEmail(email);

			if (email != null) {
				String userPassword = userEmail.getPassword();
				if (password != userPassword) {
					return userEmail;
				}
			}
		} catch (Exception e) {
			log.error("Error occured in login : " + e);
		}
		return null;
	}

	public void generateAndSendOTP(String email) throws MessagingException, jakarta.mail.MessagingException {
		if (email != null) {
			String emailOtp = String.format("%06d", new Random().nextInt(999999));
			otpStorage.put(email, emailOtp);
			otpTimestampStorage.put(email, LocalDateTime.now());
			sendEmail(email, "Ai-Tripmate", "Your Ai-Tripmate verification OTP is : " + emailOtp);
		}
	}

	private void sendEmail(String to, String subject, String body)
			throws MessagingException, jakarta.mail.MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);

		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(body, true);

		javaMailSender.send(message);
	}

	public boolean verifyAndSave(String email, String otp) {
		String storedOtp = otpStorage.get(email);
		LocalDateTime otpGeneratedTime = otpTimestampStorage.get(email);

		if (storedOtp != null && storedOtp.equals(otp) && otpGeneratedTime != null
				&& otpGeneratedTime.isAfter(LocalDateTime.now().minusMinutes(OTP_VALIDATION))) {
			otpStorage.remove(email);
			otpTimestampStorage.remove(email);
			return true;
		}
		return false;
	}

	public PublicEntity findByUserName(String userName) {
		return publicRepo.findByUserName(userName);
	}

	public PublicEntity getByEmail(String email) {
		return publicRepo.getByEmail(email);
	}

	public void feedbackSubmit(FeedbackEntity feedbackEntity) {
		try {
			StringBuilder res = new StringBuilder();
			res.append("userName: ").append(feedbackEntity.getUserName()).append("\n")
			   .append("rating: ").append(feedbackEntity.getRating()).append("\n")
			   .append("comment: ").append(feedbackEntity.getUserComment());

			String result = res.toString();
			sendEmail(EMAIL , feedbackEntity.getUserEmail() , result);
			feedbackRepo.save(feedbackEntity);
		} catch (Exception e) {
			log.error("Error occured in feedback submit : " + e);
		}
	}
}
