package com.spring.carebookie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.carebookie.dto.response.InvoiceResponseDto;
import com.spring.carebookie.service.InvoiceService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/care-bookie/employee")
public class EmployeeController {

    private final InvoiceService invoiceService;

    @ApiOperation("Get detail user invoice by userId")
    @GetMapping("/invoice/detail/{hospitalId}/{userId}")
    public ResponseEntity<InvoiceResponseDto> getDetailByUserId(@PathVariable String hospitalId, @PathVariable String userId) {
        return ResponseEntity.ok(invoiceService.getInvoiceByHospitalIdAndUserId(hospitalId, userId));
    }
}
