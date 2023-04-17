package com.spring.carebookie.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.carebookie.dto.DoctorGetAllDto;
import com.spring.carebookie.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/care-bookie/doctor")
public class DoctorController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<DoctorGetAllDto>> getAllDoctors() {
        return ResponseEntity.ok(userService.getAllDoctors());
    }
}
