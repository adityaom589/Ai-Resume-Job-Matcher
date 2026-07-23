package com.aditya.resumejobmatcher.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {
    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateResponse(String prompt) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-goog-api-key", apiKey);

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", prompt)
                                )
                        )
                )
        );

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.POST,
                request,
                String.class
        );

        ObjectMapper mapper = new ObjectMapper();

        try {
            JsonNode json = mapper.readTree(response.getBody());

            return json.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error parsing Gemini response";
        }
    }

    public String reviewResume(String resumeText) {

        String prompt = """
            You are an expert technical recruiter.

            Analyze the following resume.

            Provide:

            1. ATS Score (0-100)

            2. Resume Strengths

            3. Missing Skills

            4. Resume Improvements

            5. Best Suitable Job Roles

            Resume:

            """ + resumeText;

        return generateResponse(prompt);
    }

    public String generateInterviewQuestions(String resumeText) {

        String prompt = """
            You are a senior technical interviewer.

            Based on the following resume, generate:

            1. Five Java interview questions
            2. Five Spring Boot interview questions
            3. Five HR interview questions
            4. Three project-based questions

            Resume:

            """ + resumeText;

        return generateResponse(prompt);
    }

    public String generateCoverLetter(String resumeText, String jobDescription) {

        String prompt = """
            You are an expert career coach.

            Based on the following resume and job description,
            generate a professional cover letter.

            Resume:
            """ + resumeText +

                """
    
                Job Description:
                """ + jobDescription;

        return generateResponse(prompt);
    }
}
