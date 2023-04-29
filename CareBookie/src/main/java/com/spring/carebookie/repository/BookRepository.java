package com.spring.carebookie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.carebookie.entity.BookEntity;

public interface BookRepository extends JpaRepository<BookEntity, Long> {
}
