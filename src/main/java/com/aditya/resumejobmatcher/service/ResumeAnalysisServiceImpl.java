package com.aditya.resumejobmatcher.service;

import com.aditya.resumejobmatcher.dto.ResumeAnalysisResponse;
import com.aditya.resumejobmatcher.entity.Resume;
import com.aditya.resumejobmatcher.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.aditya.resumejobmatcher.ai.GeminiService;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
@RequiredArgsConstructor

public class ResumeAnalysisServiceImpl implements ResumeAnalysisService {

    private final ResumeRepository resumeRepository;

    private final GeminiService geminiService;

    @Override
    public ResumeAnalysisResponse analyzeLatestResume() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Resume resume = resumeRepository
                .findTopByUserEmailOrderByUploadedAtDesc(email)
                .orElseThrow(() -> new RuntimeException("No resume found"));

        return analyzeResume(resume.getId());
    }


    @Override
    public ResumeAnalysisResponse analyzeResume(Long resumeId) {


        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        if (!resume.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        String text = resume.getExtractedText();
        String aiReview = geminiService.reviewResume(text);

        return ResumeAnalysisResponse.builder()
                .candidateName(extractCandidateName(text))
                .skills(geminiService.extractSkills(text))
                .education(extractEducation(text))
                .experienceYears(extractExperienceYears(text))
                .summary(generateSummary(text))
                .aiReview(aiReview)
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
