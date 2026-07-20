package com.aditya.resumejobmatcher.service;

import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {

    String uploadResume(MultipartFile file);

}
