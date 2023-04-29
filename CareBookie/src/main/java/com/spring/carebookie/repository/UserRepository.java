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

    @Query(value = UserSql.GET_ALL_DOCTOR_BY_HOSPITAL_ID, nativeQuery = true)
    List<DoctorGetAllProjection> getAllDoctorByHospitalId(@Param("hospitalId") String hospitalId);

    @Query(value = UserSql.SEARCH_DOCTOR_BY_KEY,nativeQuery = true)
    List<DoctorGetAllProjection> searchDoctorByKey(@Param("key") String key);

    @Query(value = "select u from UserEntity u where u.isDoctor is true and u.hospitalId = :hospitalId")
    List<UserEntity> findAllByHospitalId(@Param("hospitalId") String hospitalId);


    @Query("select u from UserEntity u where u.isDoctor = true")
    List<UserEntity> findAllByDoctorIsTrue();

    @Query("select u from UserEntity u where u.hospitalId is null")
    List<UserEntity> findAllByHospitalIdIsNull();

    @Query("select u from UserEntity u where u.userId = ?1")
    UserEntity findByUserId(String userId);

    @Query(value = "select u from UserEntity u where u.hospitalId = :hospitalId")
    List<UserEntity> findAllEmployeesByHospitalId(String hospitalId);


    @Query("select u from UserEntity u where u.phone = ?1")
    UserEntity findByPhone(String phone);

}
