package com.spring.carebookie.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.spring.carebookie.common.mappers.UserMapper;
import com.spring.carebookie.dto.DoctorGetAllDto;
import com.spring.carebookie.dto.HospitalGetAllDto;
import com.spring.carebookie.dto.SearchHomeDto;
import com.spring.carebookie.repository.HospitalRepository;
import com.spring.carebookie.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommonService {

    private final HospitalRepository hospitalRepository;

    private final UserRepository userRepository;

    private static final UserMapper USER_MAPPER = UserMapper.INSTANCE;

    public SearchHomeDto searchByKey(String key) {

        List<DoctorGetAllDto> doctors = userRepository.searchDoctorByKey(key).stream()
                .map(projection -> {
                    List<String> knowledges = Arrays.stream(projection.getKnowledge().split(","))
                            .collect(Collectors.toList());
                    DoctorGetAllDto dto = USER_MAPPER.convertProjectToDto(projection);
                    dto.setKnowledges(knowledges);
                    return dto;
                })
                .collect(Collectors.toList());

        List<HospitalGetAllDto> hospitals = hospitalRepository.searchHospitalByKey(key).stream()
                .map(p -> new HospitalGetAllDto(p, hospitalRepository.getWardsByHospitalId(p.getHospitalId()),
                        hospitalRepository.getAllServiceByHospitalId(p.getHospitalId())))
                .collect(Collectors.toList());

        return new SearchHomeDto(hospitals, doctors);
    }

}
