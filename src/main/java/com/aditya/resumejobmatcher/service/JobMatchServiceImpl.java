package com.aditya.resumejobmatcher.service;

import com.aditya.resumejobmatcher.ai.GeminiService;
import com.aditya.resumejobmatcher.dto.JobMatchResponse;
import com.aditya.resumejobmatcher.repository.JobRepository;
import com.aditya.resumejobmatcher.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.aditya.resumejobmatcher.entity.Job;
import com.aditya.resumejobmatcher.entity.Resume;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class JobMatchServiceImpl implements JobMatchService{

    private final ResumeRepository resumeRepository;
    private final JobRepository jobRepository;
    private final GeminiService geminiService;

    @Override
    public JobMatchResponse matchResumeWithJob(Long resumeId, Long jobId) {

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        String aiResponse = geminiService.analyzeResumeAgainstJob(
                resume.getExtractedText(),
                job.getDescription()
        );

        try {

            ObjectMapper mapper = new ObjectMapper();


            return mapper.readValue(aiResponse, JobMatchResponse.class);

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException("Failed to parse Gemini response.");

        }
    }

}
