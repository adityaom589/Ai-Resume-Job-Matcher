package com.aditya.resumejobmatcher.service;

import com.aditya.resumejobmatcher.dto.ResumeAnalysisResponse;

public interface ResumeAnalysisService {
    ResumeAnalysisResponse analyzeLatestResume();

    ResumeAnalysisResponse analyzeResume(Long resumeId);

}
