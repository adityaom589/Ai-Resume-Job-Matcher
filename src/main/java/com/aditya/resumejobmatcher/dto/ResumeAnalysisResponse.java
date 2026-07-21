package com.aditya.resumejobmatcher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysisResponse {
    private String candidateName;

    private List<String> skills;

    private String education;

    private int experienceYears;

    private String summary;
}
