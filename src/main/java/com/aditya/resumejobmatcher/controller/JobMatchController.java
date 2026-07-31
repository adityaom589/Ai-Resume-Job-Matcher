package com.aditya.resumejobmatcher.controller;

import com.aditya.resumejobmatcher.dto.JobMatchResponse;
import com.aditya.resumejobmatcher.service.JobMatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/job")
@RequiredArgsConstructor
public class JobMatchController {

    private final JobMatchService jobMatchService;

    @GetMapping("/match")
    public JobMatchResponse matchResumeWithJob(
            @RequestParam Long resumeId,
            @RequestParam Long jobId
    ) {

        return jobMatchService.matchResumeWithJob(resumeId, jobId);

    }
}