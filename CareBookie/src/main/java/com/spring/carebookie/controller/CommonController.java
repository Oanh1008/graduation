package com.spring.carebookie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.carebookie.dto.SearchHomeDto;
import com.spring.carebookie.service.CommonService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/care-bookie/common")
public class CommonController {

    private final CommonService commonService;

    @GetMapping("/search")
    public ResponseEntity<SearchHomeDto> searchByKey(@RequestParam String key) {
        return ResponseEntity.ok(commonService.searchByKey(key));
    }
}
