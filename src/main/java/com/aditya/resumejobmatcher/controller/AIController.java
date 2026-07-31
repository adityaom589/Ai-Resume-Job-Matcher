package com.aditya.resumejobmatcher.controller;

import com.aditya.resumejobmatcher.ai.GeminiService;
import com.aditya.resumejobmatcher.dto.CoverLetterRequest;
import com.aditya.resumejobmatcher.entity.Resume;
import com.aditya.resumejobmatcher.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final GeminiService geminiService;
    private final ResumeRepository resumeRepository;

    @PostMapping("/cover-letter")
    public String generateCoverLetter(
            @RequestBody CoverLetterRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Resume resume = resumeRepository
                .findTopByUserEmailOrderByUploadedAtDesc(email)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        return geminiService.generateCoverLetter(
                resume.getExtractedText(),
                request.getJobDescription()
        );
    }

    @PostMapping("/interview-questions")
    public String generateInterviewQuestions() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Resume resume = resumeRepository
                .findTopByUserEmailOrderByUploadedAtDesc(email)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        return geminiService.generateInterviewQuestions(
                resume.getExtractedText()
        );
    }

}