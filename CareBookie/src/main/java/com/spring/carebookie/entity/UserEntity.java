package com.spring.carebookie.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    private String firstName;

    private String lastName;

    private String birthDay;

    @Column(unique = true)
    private String email;

    private String phone;

    private String address;

    private String imageLink;

    private String password;

    private String knowledge;

    private Boolean isDisable;

    private String hospitalId;

    private String wardId;

    private Long roleId;

    private String information;
}
