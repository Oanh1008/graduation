package com.spring.carebookie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.carebookie.dto.save.RatingDoctorSaveDto;
import com.spring.carebookie.dto.save.RatingHospitalSaveDto;
import com.spring.carebookie.entity.RatingDoctorEntity;
import com.spring.carebookie.entity.RatingHospitalEntity;
import com.spring.carebookie.service.CommonService;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/care-bookie/user")
@CrossOrigin("*")
public class UserController {

    private CommonService commonService;

    @ApiOperation("Create new comment for doctor")
    @PostMapping("comment/doctor")
    public ResponseEntity<RatingDoctorEntity> saveCommentDoctor(@RequestBody RatingDoctorSaveDto dto) {
        return ResponseEntity.ok(commonService.saveRatingDoctor(dto));
    }

    @ApiOperation("Create new comment for hospital")
    @PostMapping("comment/hospital")
    public ResponseEntity<RatingHospitalEntity> saveCommentHospital(@RequestBody RatingHospitalSaveDto dto) {
        return ResponseEntity.ok(commonService.saveRatingHospital(dto));
    }
}
