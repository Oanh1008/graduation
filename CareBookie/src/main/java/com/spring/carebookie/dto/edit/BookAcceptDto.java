package com.spring.carebookie.dto.edit;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class BookAcceptDto {

    private Long bookId;

    private String doctorId;

    private String date;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dateExamination;

    private String session;

    private String operatorId;

}
