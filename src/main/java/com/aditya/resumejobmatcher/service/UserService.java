package com.aditya.resumejobmatcher.service;
import com.aditya.resumejobmatcher.dto.LoginRequest;
import com.aditya.resumejobmatcher.dto.RegisterRequest;
import com.aditya.resumejobmatcher.dto.UserProfileResponse;

public interface UserService {

    String register(RegisterRequest request);
    String login(LoginRequest request);

    UserProfileResponse getProfile();
}
