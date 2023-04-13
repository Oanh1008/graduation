package com.spring.carebookie.controller.super_admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.carebookie.dto.HospitalSaveDto;
import com.spring.carebookie.service.HospitalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/care-bookie/")
public class HospitalSupperAdminController {

    private final HospitalService hospitalService;

    @PostMapping
    public ResponseEntity<List<Object>> save(HospitalSaveDto dto) {
        hospitalService.saveHospital(dto);
        return ResponseEntity.ok().build();
    }
}
