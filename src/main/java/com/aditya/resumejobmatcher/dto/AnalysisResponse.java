package com.aditya.resumejobmatcher.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnalysisResponse {

    private int atsScore;

    private int matchPercentage;

    private String summary;

}