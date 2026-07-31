package com.aditya.resumejobmatcher.repository;

import com.aditya.resumejobmatcher.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    Optional<Resume> findTopByUserEmailOrderByUploadedAtDesc(String email);

    List<Resume> findByUserEmailOrderByUploadedAtDesc(String email);

    Optional<Resume> findByUserEmailAndFileHash(String email, String fileHash);

}