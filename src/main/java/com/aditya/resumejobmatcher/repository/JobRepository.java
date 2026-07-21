package com.aditya.resumejobmatcher.repository;

import com.aditya.resumejobmatcher.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}
