package com.aditya.resumejobmatcher.service;


import com.aditya.resumejobmatcher.dto.JobMatchResponse;

public interface JobMatchService {

    JobMatchResponse matchResumeWithJob(Long resumeId, Long jobId);
}

