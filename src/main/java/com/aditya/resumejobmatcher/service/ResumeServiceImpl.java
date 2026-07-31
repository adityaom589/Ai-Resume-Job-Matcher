package com.aditya.resumejobmatcher.service;

import com.aditya.resumejobmatcher.entity.Resume;
import com.aditya.resumejobmatcher.entity.User;
import com.aditya.resumejobmatcher.repository.ResumeRepository;
import com.aditya.resumejobmatcher.repository.UserRepository;
import com.aditya.resumejobmatcher.util.PdfUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.HexFormat;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    @Override
    public String uploadResume(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Please select a resume file");
        }

        String originalName = Optional.ofNullable(file.getOriginalFilename())
                .filter(name -> !name.isBlank())
                .orElse("resume.pdf");

        try {
            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String fileHash = calculateSha256(file);

            Optional<Resume> existingResume =
                    resumeRepository.findByUserEmailAndFileHash(email, fileHash);

            if (existingResume.isPresent()) {
                Resume existing = existingResume.get();
                return "This resume is already in your library (ID: "
                        + existing.getId() + "). No duplicate was stored.";
            }

            Path uploadDirectory = Paths.get("uploads");
            Files.createDirectories(uploadDirectory);

            String storedFileName = System.currentTimeMillis() + "_" + originalName;
            Path filePath = uploadDirectory.resolve(storedFileName);

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            }

            String resumeText = PdfUtil.extractText(filePath.toString());

            Resume resume = Resume.builder()
                    .fileName(originalName)
                    .fileType(file.getContentType())
                    .filePath(filePath.toString())
                    .fileHash(fileHash)
                    .extractedText(resumeText)
                    .uploadedAt(LocalDateTime.now())
                    .user(user)
                    .build();

            Resume savedResume = resumeRepository.save(resume);

            return "Resume uploaded successfully (ID: " + savedResume.getId() + ").";

        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload resume: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Resume> getMyResumes() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        return resumeRepository.findByUserEmailOrderByUploadedAtDesc(email);
    }

    @Override
    public void deleteResume(Long id) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        if (!resume.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        resumeRepository.delete(resume);

        if (resume.getFilePath() != null) {
            try {
                Files.deleteIfExists(Paths.get(resume.getFilePath()));
            } catch (Exception ignored) {
                // The database record is already deleted; an old missing/locked file
                // should not cause the entire delete request to fail.
            }
        }
    }

    private String calculateSha256(MultipartFile file) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");

        try (InputStream inputStream = file.getInputStream()) {
            byte[] buffer = new byte[8192];
            int bytesRead;

            while ((bytesRead = inputStream.read(buffer)) != -1) {
                digest.update(buffer, 0, bytesRead);
            }
        }

        return HexFormat.of().formatHex(digest.digest());
    }
}
