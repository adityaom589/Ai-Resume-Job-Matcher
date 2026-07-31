package com.aditya.resumejobmatcher.service;

import com.aditya.resumejobmatcher.dto.AdminStatsResponse;
import com.aditya.resumejobmatcher.repository.JobRepository;
import com.aditya.resumejobmatcher.repository.ResumeRepository;
import com.aditya.resumejobmatcher.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final JobRepository jobRepository;

    public AdminStatsResponse getStats() {

        return AdminStatsResponse.builder()
                .users(userRepository.count())
                .resumes(resumeRepository.count())
                .jobs(jobRepository.count())

                // temporary
                .aiRequests(0)

                .build();
    }
}