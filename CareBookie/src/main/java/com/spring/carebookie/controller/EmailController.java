package com.spring.carebookie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import com.spring.carebookie.dto.EmailRequest;
import com.spring.carebookie.service.EmailService;

@RestController
public class EmailController {

    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-email")
    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendEmail(emailRequest.getToEmail(), emailRequest.getSubject(), emailRequest.getBody());
            System.out.println("Email sent successfully.");
        } catch (IOException e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }
}
