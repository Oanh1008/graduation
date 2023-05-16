package com.spring.carebookie.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ForgotPasswordDto {

    private String userId;

    private String code;

    private String newPassword;

    private String confirmPassword;
}
