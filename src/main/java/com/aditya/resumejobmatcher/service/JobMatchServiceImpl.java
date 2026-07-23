package com.aditya.resumejobmatcher.service;

import com.aditya.resumejobmatcher.dto.JobMatchResponse;
import com.aditya.resumejobmatcher.repository.JobRepository;
import com.aditya.resumejobmatcher.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.aditya.resumejobmatcher.entity.Job;
import com.aditya.resumejobmatcher.entity.Resume;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobMatchServiceImpl implements JobMatchService{

    private final ResumeRepository resumeRepository;
    private final JobRepository jobRepository;

    @Override
    public JobMatchResponse matchResumeWithJob(Long resumeId, Long jobId) {

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        String resumeText = resume.getExtractedText().toLowerCase();

        List<String> requiredSkills = Arrays.stream(job.getRequiredSkills().split(","))
                .map(String::trim)
                .toList();

        List<String> matchingSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();

        for (String skill : requiredSkills) {

            if (resumeText.contains(skill.toLowerCase())) {
                matchingSkills.add(skill);
            } else {
                missingSkills.add(skill);
            }
        }

        int percentage = (matchingSkills.size() * 100) / requiredSkills.size();

        String suggestion;

        if (missingSkills.isEmpty()) {
            suggestion = "Excellent! Your resume matches this job.";
        } else {
            suggestion = "Improve these skills: " + String.join(", ", missingSkills);
        }

        return JobMatchResponse.builder()
                .matchPercentage(percentage)
                .matchingSkills(matchingSkills)
                .missingSkills(missingSkills)
                .suggestion(suggestion)
                .build();
    }

}
