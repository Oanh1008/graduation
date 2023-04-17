package com.spring.carebookie.common.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.spring.carebookie.dto.DoctorGetAllDto;
import com.spring.carebookie.dto.UserSaveDto;
import com.spring.carebookie.entity.UserEntity;
import com.spring.carebookie.repository.projection.DoctorGetAllProjection;

@Mapper(nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserEntity convertSaveToEntity(UserSaveDto dto);

    DoctorGetAllDto convertProjectToDto(DoctorGetAllProjection projection);

}
