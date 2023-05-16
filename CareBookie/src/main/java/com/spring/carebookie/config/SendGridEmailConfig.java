package com.spring.carebookie.config;

import com.sendgrid.SendGrid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SendGridEmailConfig {


    private String sendGridApiKey = "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";

    @Bean
    public SendGrid sendGrid() {
        return new SendGrid(sendGridApiKey);
    }
}
