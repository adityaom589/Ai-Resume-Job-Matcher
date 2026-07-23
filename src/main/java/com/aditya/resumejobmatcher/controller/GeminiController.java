package com.aditya.resumejobmatcher.controller;

import com.aditya.resumejobmatcher.ai.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gemini")
@RequiredArgsConstructor
public class GeminiController {


    private final GeminiService geminiService;

    @GetMapping("/test")
    public String testGemini() {

        return geminiService.generateResponse(
                "Say Hello from Google Gemini AI!"
        );
    }
}
