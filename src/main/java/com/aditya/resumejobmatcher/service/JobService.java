package com.aditya.resumejobmatcher.service;

import com.aditya.resumejobmatcher.dto.JobRequest;
import com.aditya.resumejobmatcher.entity.Job;

import java.util.List;
import java.util.Optional;


public interface JobService {
    Job createJob(JobRequest request);

    List<Job> getAllJobs();

    Optional<Job> getJobById(Long id);

    Job updateJob(Long id, JobRequest request);

    void deleteJob(Long id);
}
