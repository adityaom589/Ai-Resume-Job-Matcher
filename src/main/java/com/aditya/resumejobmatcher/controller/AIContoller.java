package com.aditya.resumejobmatcher.controller;

import com.aditya.resumejobmatcher.ai.GeminiService;
import com.aditya.resumejobmatcher.entity.Resume;
import com.aditya.resumejobmatcher.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.aditya.resumejobmatcher.entity.Job;
import com.aditya.resumejobmatcher.repository.JobRepository;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIContoller {

    private final JobRepository jobRepository;
    private final ResumeRepository resumeRepository;
    private final GeminiService geminiService;

    @PostMapping("/review/{resumeId}")
    public String reviewResume(@PathVariable Long resumeId) {

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        return geminiService.reviewResume(resume.getExtractedText());
    }
    @PostMapping("/interview/{resumeId}")
    public String generateInterviewQuestions(@PathVariable Long resumeId) {

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        return geminiService.generateInterviewQuestions(
                resume.getExtractedText()
        );
    }
    @PostMapping("/cover-letter/{resumeId}/{jobId}")
    public String generateCoverLetter(
            @PathVariable Long resumeId,
            @PathVariable Long jobId) {

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        return geminiService.generateCoverLetter(
                resume.getExtractedText(),
                job.getDescription()
        );
    }
}
