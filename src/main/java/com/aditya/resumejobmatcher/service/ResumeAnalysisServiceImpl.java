package com.aditya.resumejobmatcher.service;

import com.aditya.resumejobmatcher.dto.ResumeAnalysisResponse;
import com.aditya.resumejobmatcher.entity.Resume;
import com.aditya.resumejobmatcher.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor

public class ResumeAnalysisServiceImpl implements ResumeAnalysisService {

    private final ResumeRepository resumeRepository;

    @Override
    public ResumeAnalysisResponse analyzeResume() {

        Resume resume = resumeRepository.findTopByOrderByUploadedAtDesc();

        if (resume == null) {
            throw new RuntimeException("No resume found.");
        }

        String text = resume.getExtractedText();

        return ResumeAnalysisResponse.builder()
                .candidateName(extractCandidateName(text))
                .skills(extractSkills(text))
                .education(extractEducation(text))
                .experienceYears(extractExperienceYears(text))
                .summary(generateSummary(text))
                .build();
    }

    private String extractCandidateName(String text) {

        String[] lines = text.split("\\R");

        for (String line : lines) {

            line = line.trim();

            if (!line.isEmpty()) {
                return line;
            }
        }

        return "Unknown";
    }
    private List<String> extractSkills(String text) {

        List<String> skills = new ArrayList<>();

        String lowerText = text.toLowerCase();

        String[] predefinedSkills = {
                "Java",
                "Spring Boot",
                "MySQL",
                "MongoDB",
                "React",
                "Node.js",
                "Express.js",
                "JavaScript",
                "HTML",
                "CSS",
                "Git",
                "GitHub",
                "Docker",
                "JWT",
                "OAuth",
                "REST API",
                "Bootstrap",
                "Cloudinary",
                "Postman",
                "Render",
                "Vercel"
        };

        for (String skill : predefinedSkills) {

            if (lowerText.contains(skill.toLowerCase())) {
                skills.add(skill);
            }
        }

        return skills;
    }

    private String extractEducation(String text) {

        String[] educationKeywords = {
                "B.Tech",
                "B.E.",
                "Bachelor of Technology",
                "Bachelor of Engineering",
                "M.Tech",
                "MCA",
                "BCA",
                "B.Sc",
                "M.Sc",
                "MBA",
                "Diploma"
        };

        for (String keyword : educationKeywords) {

            if (text.toLowerCase().contains(keyword.toLowerCase())) {
                return keyword;
            }
        }

        return "Not Found";
    }

    private int extractExperienceYears(String text) {

        String lowerText = text.toLowerCase();

        if (lowerText.contains("fresher")) {
            return 0;
        }

        if (lowerText.contains("1 year")) {
            return 1;
        }

        if (lowerText.contains("2 years")) {
            return 2;
        }

        if (lowerText.contains("3 years")) {
            return 3;
        }

        if (lowerText.contains("4 years")) {
            return 4;
        }

        if (lowerText.contains("5 years")) {
            return 5;
        }

        return 0;
    }

    private String generateSummary(String text) {

        String[] lines = text.split("\\R");

        StringBuilder summary = new StringBuilder();

        int count = 0;

        for (String line : lines) {

            line = line.trim();

            if (!line.isEmpty()) {
                summary.append(line).append(" ");

                count++;

                if (count == 5) {
                    break;
                }
            }
        }

        return summary.toString().trim();
    }
}
