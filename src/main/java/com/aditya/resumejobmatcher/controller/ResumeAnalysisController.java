package com.aditya.resumejobmatcher.controller;

import com.aditya.resumejobmatcher.dto.ResumeAnalysisResponse;
import com.aditya.resumejobmatcher.service.ResumeAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeAnalysisController {
    private final ResumeAnalysisService resumeAnalysisService;

    @GetMapping("/analyze")
    public ResumeAnalysisResponse analyzeResume() {
        return resumeAnalysisService.analyzeResume();
    }

}
