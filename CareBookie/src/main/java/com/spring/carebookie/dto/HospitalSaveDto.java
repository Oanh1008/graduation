package com.spring.carebookie.dto;

import javax.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HospitalSaveDto {

    @NotBlank
    private String hospitalName;

    private Boolean isRate;

    private Boolean isPublicPrice;

    private Boolean isChoosenDoctor;

    @NotBlank
    private String phoneNumber;

    private String address;

    private String district;

    private BigDecimal price;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "hh:mm:ss")
    private String workingTimeFrom;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "hh:mm:ss")
    private String workingTimeTo;

    private String periodWorkingDayFrom;

    private String periodWorkingDayTo;

    private String adminId;

}
