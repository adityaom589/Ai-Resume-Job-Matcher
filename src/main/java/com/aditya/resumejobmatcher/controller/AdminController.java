package com.aditya.resumejobmatcher.controller;

import com.aditya.resumejobmatcher.dto.AdminStatsResponse;
import com.aditya.resumejobmatcher.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/stats")
    public AdminStatsResponse getStats() {
        return adminService.getStats();
    }

}