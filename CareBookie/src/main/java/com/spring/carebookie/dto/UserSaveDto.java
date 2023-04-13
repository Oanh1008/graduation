package com.spring.carebookie.dto;

import javax.validation.constraints.NotBlank;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserSaveDto {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private String birthDay;

    @NotBlank
    private String email;

    @NotBlank
    private String phone;

    private String address;

    private String imageLink;

    @NotBlank
    private String password;

    private String knowledge;

}
