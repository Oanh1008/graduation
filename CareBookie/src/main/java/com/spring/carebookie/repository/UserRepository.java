package com.spring.carebookie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.carebookie.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
