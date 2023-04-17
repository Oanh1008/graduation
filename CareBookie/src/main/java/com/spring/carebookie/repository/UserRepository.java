package com.spring.carebookie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.carebookie.entity.UserEntity;
import com.spring.carebookie.repository.projection.DoctorGetAllProjection;
import com.spring.carebookie.repository.sql.UserSql;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query(value = UserSql.GET_ALL_DOCTORS, nativeQuery = true)
    List<DoctorGetAllProjection> getAllDoctors();

    @Query(value = UserSql.SEARCH_DOCTOR_BY_KEY,nativeQuery = true)
    List<DoctorGetAllProjection> searchDoctorByKey(@Param("key") String key);

}
