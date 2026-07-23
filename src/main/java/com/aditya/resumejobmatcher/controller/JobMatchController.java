package com.aditya.resumejobmatcher.controller;

import com.aditya.resumejobmatcher.dto.JobMatchResponse;
import com.aditya.resumejobmatcher.service.JobMatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/match")
@RequiredArgsConstructor
public class JobMatchController {

    private final JobMatchService jobMatchService;

    @GetMapping("/{resumeId}/{jobId}")
    public JobMatchResponse matchResumeWithJob(
            @PathVariable Long resumeId,
            @PathVariable Long jobId) {

        return jobMatchService.matchResumeWithJob(resumeId, jobId);
    }
}
