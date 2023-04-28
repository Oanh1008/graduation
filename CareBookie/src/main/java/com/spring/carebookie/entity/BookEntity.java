package com.spring.carebookie.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
@Table(name = "book")
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    private String hospitalId;

    private String doctorId;

    private String date;

    private String session;

    private String symptom;

    private boolean isShareInvoice;

    private String message;

    private String name;

    private int age;

    private String gender;

    private String status;

    private LocalDateTime dateTimeBook;
}
