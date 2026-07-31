package com.aditya.resumejobmatcher.controller;

import com.aditya.resumejobmatcher.entity.Resume;

import com.aditya.resumejobmatcher.repository.ResumeRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeQueryController {

    private final ResumeRepository resumeRepository;


    @GetMapping("/latest")
    public Resume getLatestResume() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return resumeRepository
                .findTopByUserEmailOrderByUploadedAtDesc(email)
                .orElseThrow(() -> new RuntimeException("No resume found"));

    }
}