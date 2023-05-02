package com.spring.carebookie.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.carebookie.dto.edit.BookAcceptDto;
import com.spring.carebookie.dto.edit.BookCancelDto;
import com.spring.carebookie.dto.response.BookResponseDto;
import com.spring.carebookie.entity.BookEntity;
import com.spring.carebookie.service.BookService;
import com.spring.carebookie.service.UserService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/care-bookie/administrative")
public class AdministrativeController {

    private final BookService bookService;

    private final UserService userService;

    @ApiOperation("Cancel book")
    @PutMapping("/book/cancel")
    public ResponseEntity<BookResponseDto> cancelBook(@RequestBody BookCancelDto dto) {
        return ResponseEntity.ok(bookService.cancelBook(dto));
    }

    @ApiOperation("Accept book")
    @PutMapping("/book/accept")
    public ResponseEntity<BookEntity> acceptBook(@RequestBody BookAcceptDto dto) {
        return ResponseEntity.ok(bookService.acceptBook(dto));
    }

    @ApiOperation("Confirm book")
    @PutMapping("/book/confirm")
    public ResponseEntity<BookEntity> confirmBook(@RequestParam Long bookId) {
        return ResponseEntity.ok(bookService.confirmBook(bookId));
    }

    @ApiOperation("Get all book with status accept from this day to future")
    @GetMapping("/book/accept/{hospitalId}")
    public ResponseEntity<List<BookResponseDto>> getAllAcceptBookByHospitalId(@PathVariable String hospitalId) {
        return ResponseEntity.ok(bookService.getAllBookAcceptByHospitalId(hospitalId));
    }

    @ApiOperation("Get all book with status pending from this day to future")
    @GetMapping("/book/pending/{hospitalId}")
    public ResponseEntity<List<BookResponseDto>> getAllPendingBookByHospitalId(@PathVariable String hospitalId) {
        return ResponseEntity.ok(bookService.getAllBookPendingByHospitalId(hospitalId));
    }

    @ApiOperation("Get all book with status cancel from this day to future")
    @GetMapping("/book/cancel/{hospitalId}")
    public ResponseEntity<List<BookResponseDto>> getAllCancelBookByHospitalId(@PathVariable String hospitalId) {
        return ResponseEntity.ok(bookService.getAllBookCancelByHospitalId(hospitalId));
    }

    @ApiOperation("Get all book with status confirm from this day to future")
    @GetMapping("/book/confirm/{hospitalId}")
    public ResponseEntity<List<BookResponseDto>> getAllConfirmBookByHospitalId(@PathVariable String hospitalId) {
        return ResponseEntity.ok(bookService.getAllBookConfirmByHospitalId(hospitalId));
    }

}
