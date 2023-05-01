package com.spring.carebookie.dto.edit;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ServiceUpdateDto {

    private Long serviceId;

    private String serviceName;

    private BigDecimal price;
}
