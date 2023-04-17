package com.spring.carebookie.controller;

import javax.validation.Valid;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.carebookie.dto.UserSaveDto;
import com.spring.carebookie.entity.UserEntity;
import com.spring.carebookie.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/care-bookie/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserEntity>> getAllUser() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/save")
    public ResponseEntity<Object> save(@Valid @RequestBody UserSaveDto dto) {
        userService.save(dto);
        return ResponseEntity.ok().build();
    }
}
