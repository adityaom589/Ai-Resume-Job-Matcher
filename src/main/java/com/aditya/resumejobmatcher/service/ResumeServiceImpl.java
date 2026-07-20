package com.aditya.resumejobmatcher.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.aditya.resumejobmatcher.entity.Resume;
import com.aditya.resumejobmatcher.entity.User;
import com.aditya.resumejobmatcher.repository.ResumeRepository;
import com.aditya.resumejobmatcher.repository.UserRepository;

import java.time.LocalDateTime;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService  {
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    @Override
    public String uploadResume(MultipartFile file) {

        try {

            String uploadDir = "uploads/";

            File directory = new File(uploadDir);

            if (!directory.exists()) {
                directory.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            Path filePath = Paths.get(uploadDir, fileName);

            Files.copy(file.getInputStream(), filePath);
            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            String email = authentication.getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Resume resume = Resume.builder()
                    .fileName(fileName)
                    .fileType(file.getContentType())
                    .filePath(filePath.toString())
                    .uploadedAt(LocalDateTime.now())
                    .user(user)
                    .build();

            resumeRepository.save(resume);

            return "Resume uploaded and saved successfully!";

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload resume");
        }
    }

}
