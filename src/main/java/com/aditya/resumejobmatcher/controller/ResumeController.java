package com.aditya.resumejobmatcher.controller;


import com.aditya.resumejobmatcher.entity.Resume;
import com.aditya.resumejobmatcher.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadResume(
            @RequestParam("file") MultipartFile file) {

        String message = resumeService.uploadResume(file);

        return ResponseEntity.ok(message);
    }
    @GetMapping("/my")
    public List<Resume> getMyResumes() {
        return resumeService.getMyResumes();
    }

    @DeleteMapping("/{id}")
    public String deleteResume(@PathVariable Long id) {

        resumeService.deleteResume(id);

        return "Resume deleted successfully";
    }
}
