package com.spring.carebookie.dto.edit;

import javax.validation.constraints.NotBlank;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ServiceUpdateDto {

    @NotBlank
    private Long serviceId;

    @NotBlank
    private String serviceName;

    @NotBlank
    private BigDecimal price;
}
