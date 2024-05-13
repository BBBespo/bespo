package com.ssafy.bespo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(org.springframework.web.servlet.config.annotation.CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedOrigins("https://bespo.co.kr")
                .allowedOrigins("http://bespo.co.kr")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
