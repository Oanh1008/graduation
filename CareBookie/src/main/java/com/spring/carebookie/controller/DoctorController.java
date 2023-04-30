package com.spring.carebookie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.carebookie.service.BookService;
import com.spring.carebookie.service.UserService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/care-bookie/doctor")
public class DoctorController {

    private final UserService userService;

    private final BookService bookService;

    @ApiOperation("Get all book doctorId and status is ACCEPT")
    @GetMapping("/book/accept")
    public ResponseEntity<?> getAllBookAcceptedByDoctorId(@RequestParam String doctorId) {
        return ResponseEntity.ok(bookService.getAllBookAcceptByDoctorId(doctorId));
    }

    @ApiOperation("Get all book doctorId and status is ACCEPT")
    @GetMapping("/book/confirm")
    public ResponseEntity<?> getAllBookConfirmByDoctorId(@RequestParam String doctorId) {
        return ResponseEntity.ok(bookService.getAllBookConfirmByDoctorId(doctorId));
    }

}
