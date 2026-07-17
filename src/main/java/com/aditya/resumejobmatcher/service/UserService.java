package com.aditya.resumejobmatcher.service;
import com.aditya.resumejobmatcher.dto.RegisterRequest;

public interface UserService {

    String register(RegisterRequest request);
}
