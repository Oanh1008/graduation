package com.spring.carebookie.dto.edit;

import javax.validation.constraints.NotBlank;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class BookAcceptDto {

    @NotBlank
    private Long bookId;

    private String doctorId;

    @NotBlank
    private String date;

    @NotBlank
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dateExamination;

    @NotBlank
    private String session;

    @NotBlank
    private String operatorId;

}
