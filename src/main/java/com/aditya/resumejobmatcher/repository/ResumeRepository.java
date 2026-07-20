package com.aditya.resumejobmatcher.repository;


import com.aditya.resumejobmatcher.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ResumeRepository extends JpaRepository<Resume, Long> {
}
