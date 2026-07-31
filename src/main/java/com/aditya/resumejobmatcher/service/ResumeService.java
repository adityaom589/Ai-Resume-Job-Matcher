package com.aditya.resumejobmatcher.service;

import com.aditya.resumejobmatcher.entity.Resume;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface ResumeService {

    String uploadResume(MultipartFile file);

    List<Resume> getMyResumes();

    void deleteResume(Long id);

}
