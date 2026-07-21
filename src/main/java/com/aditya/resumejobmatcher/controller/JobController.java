package com.aditya.resumejobmatcher.controller;

import com.aditya.resumejobmatcher.dto.JobRequest;
import com.aditya.resumejobmatcher.entity.Job;
import com.aditya.resumejobmatcher.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping
    public Job createJob(@RequestBody JobRequest request) {
        return jobService.createJob(request);
    }
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {

        return jobService.getJobById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    @PutMapping("/{id}")
    public Job updateJob(
            @PathVariable Long id,
            @RequestBody JobRequest request) {

        return jobService.updateJob(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {

        jobService.deleteJob(id);

        return "Job deleted successfully.";
    }
}
