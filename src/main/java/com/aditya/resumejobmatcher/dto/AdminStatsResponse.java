package com.aditya.resumejobmatcher.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsResponse {

    private long users;

    private long resumes;

    private long jobs;

    private long aiRequests;
}