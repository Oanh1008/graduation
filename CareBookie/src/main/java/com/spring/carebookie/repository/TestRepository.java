package com.spring.carebookie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.carebookie.entity.BookTypeEntity;

@Repository
public interface TestRepository extends JpaRepository<BookTypeEntity, String>{

}
