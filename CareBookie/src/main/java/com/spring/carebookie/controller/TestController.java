package com.spring.carebookie.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.carebookie.entity.UserProfileEntity;
import com.spring.carebookie.service.TestService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/care-bookie")
@CrossOrigin("*")
public class TestController {

    private TestService testService;

//    @GetMapping("/get/bookTypes")
//    public ResponseEntity<List<BookTypeEntity>> getAllBookTypes() {
//        return ResponseEntity.ok(testService.getAllBookTypes());
//    }

    @GetMapping
    public ResponseEntity<List<UserProfileEntity>> getUserProfiles() {
        return ResponseEntity.ok(testService.getUserProfiles());
    }

    @PostMapping(
            path = "/{userProfileId}/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadUserProfileImage(@PathVariable("userProfileId") UUID userProfileId,
                                       @RequestParam("file") MultipartFile file) {
        testService.uploadUserProfileImage(userProfileId, file);
    }

    @GetMapping("/{userProfileId}/download")
    public ResponseEntity<byte[]> downloadUserProfileImage(@PathVariable("userProfileId") UUID userProfileId) {
        return ResponseEntity.ok(testService.downloadUserProfileImage(userProfileId));
    }

}
