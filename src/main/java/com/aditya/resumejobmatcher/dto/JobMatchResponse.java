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
    private int matchPercentage;

    private List<String> matchingSkills;

    private List<String> missingSkills;

    private String suggestion;

}
