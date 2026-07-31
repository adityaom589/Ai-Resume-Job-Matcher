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
public class JobMatchResponse {
    private int atsScore;

    private int matchPercentage;

    private List<String> matchingSkills;

    private List<String> missingSkills;

    private List<String> strengths;

    private List<String> suggestions;

    private String summary;

}
