package com.spring.carebookie.service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.carebookie.common.mappers.HospitalMapper;
import com.spring.carebookie.dto.HospitalGetAllDto;
import com.spring.carebookie.dto.HospitalSaveDto;
import com.spring.carebookie.entity.HospitalEntity;
import com.spring.carebookie.repository.HospitalRepository;
import com.spring.carebookie.repository.projection.HospitalGetAllProjection;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    private static final HospitalMapper HOSPITAL_MAPPER = HospitalMapper.INSTANCE;

    public List<HospitalGetAllDto> getAllHospital() {

        return hospitalRepository.getAllHospital()
                .stream()
                .map(p -> new HospitalGetAllDto(p, hospitalRepository.getWardsByHospitalId(p.getHospitalId()),
                        hospitalRepository.getAllServiceByHospitalId(p.getHospitalId())))
                .collect(Collectors.toList());
    }

    @Transactional
    public void saveHospital(HospitalSaveDto dto) {

        HospitalEntity entity = HOSPITAL_MAPPER.convertSaveDtoToEntity(dto);

        entity.setHospitalId(generateHospitalId(entity.getHospitalName()));
        entity.setLogoKey("44f185f4-4633-478a-a505-6dae187d9494--benh-vien-mat-tphcm.jpg");

        hospitalRepository.save(entity);
        log.info("Finished save {} hospital into database", entity.getHospitalName());
    }

    private String generateHospitalId(String hospitalName) {
        String[] arr = hospitalName.split(" ");
        Random random = new Random();
        StringBuilder builder = new StringBuilder();
        for (String a : arr) {
            builder.append(a.toCharArray()[0]);
        }
        System.out.println(builder.append(random.nextInt(10)).append(random.nextInt(10))
                .append(random.nextInt(10)).append(random.nextInt(10)));
        return builder.toString();
    }
}
