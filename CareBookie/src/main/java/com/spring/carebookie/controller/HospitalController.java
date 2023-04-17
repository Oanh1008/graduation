package com.spring.carebookie.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.carebookie.dto.HospitalGetAllDto;
import com.spring.carebookie.repository.projection.HospitalGetAllProjection;
import com.spring.carebookie.service.HospitalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/care-bookie/")
public class HospitalController {

    private final HospitalService hospitalService;

    @GetMapping
    public ResponseEntity<List<HospitalGetAllDto>> getAllHospital() {
        return ResponseEntity.ok(hospitalService.getAllHospital());
    }
}
