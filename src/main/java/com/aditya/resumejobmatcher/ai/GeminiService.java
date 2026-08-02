package com.aditya.resumejobmatcher.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;

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

    public String analyzeResumeAgainstJob(String resumeText,
                                          String jobDescription) {

        String prompt = """
You are an expert ATS Resume Analyzer and Technical Recruiter.

Compare the resume against the job description.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "matchPercentage": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "strengths": [],
  "suggestions": [],
  "summary": ""
}

Rules:

- ATS Score should be between 0-100.
- Match Percentage should be between 0-100.
- matchingSkills should contain skills present in both resume and job.
- missingSkills should contain required skills missing from the resume.
- strengths should contain 3-5 strengths.
- suggestions should contain 3-5 improvements.
- summary should be a short paragraph.

Resume:
"""
                + resumeText +

                """
    
    Job Description:
    """
                + jobDescription;

        return generateResponse(prompt);
    }

    public List<String> extractSkills(String resumeText) {

        String prompt = """
You are an expert resume parser and recruiter.

Extract all skills explicitly mentioned in the resume.

Include, whenever applicable:

- Programming Languages
- Frameworks
- Libraries
- Databases
- Cloud Platforms
- DevOps Tools
- AI/ML Frameworks
- Engineering Software
- CAD/CAE Tools
- Simulation Software
- Laboratory Tools
- ERP/CRM Tools
- APIs
- Testing Tools
- Operating Systems
- Version Control
- Office Tools
- Domain-specific software

Rules:

- Extract only skills that are explicitly mentioned.
- Do not invent skills.
- Remove duplicates.
- Preserve official technology names.
- Do not include education, company names, job titles or degrees.
- Return ONLY a valid JSON array.

Example:

[
"Java",
"Spring Boot",
"React",
"MySQL",
"Docker",
"Git",
"AWS",
"AutoCAD",
"SolidWorks",
"Aspen HYSYS",
"MATLAB"
]

Resume:

""" + resumeText;

        String result = generateResponse(prompt);

        try {
            ObjectMapper mapper = new ObjectMapper();

            String cleanedResult = result
                    .replace("```json", "")
                    .replace("```JSON", "")
                    .replace("```", "")
                    .trim();

            List<String> extractedSkills = mapper.readValue(
                    cleanedResult,
                    mapper.getTypeFactory()
                            .constructCollectionType(List.class, String.class)
            );

            return extractedSkills.stream()
                    .filter(skill -> skill != null && !skill.isBlank())
                    .map(String::trim)
                    .distinct()
                    .toList();

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
