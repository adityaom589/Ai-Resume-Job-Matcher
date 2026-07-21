package com.aditya.resumejobmatcher.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String company;

    private String location;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;

    private String requiredSkills;

    private int minimumExperience;

    private LocalDateTime createdAt;
}

