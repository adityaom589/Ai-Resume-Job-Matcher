package com.aditya.resumejobmatcher.controller;

import com.aditya.resumejobmatcher.dto.AnalysisRequest;
import com.aditya.resumejobmatcher.dto.AnalysisResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analysis")
public class AnalysisController {

    @PostMapping
    public AnalysisResponse analyze(
            @RequestBody AnalysisRequest request
    ) {

        return AnalysisResponse.builder()
                .atsScore(88)
                .matchPercentage(84)
                .summary("Dummy response. Gemini integration coming next.")
                .build();

    }

}