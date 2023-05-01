package com.spring.carebookie.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.carebookie.common.mappers.RatingDoctorMapper;
import com.spring.carebookie.common.mappers.RatingHospitalMapper;
import com.spring.carebookie.common.mappers.ServiceMapper;
import com.spring.carebookie.common.mappers.UserMapper;
import com.spring.carebookie.dto.DoctorGetAllDto;
import com.spring.carebookie.dto.HospitalGetAllDto;
import com.spring.carebookie.dto.SearchHomeDto;
import com.spring.carebookie.dto.edit.ServiceUpdateDto;
import com.spring.carebookie.dto.response.RatingDoctorResponseDto;
import com.spring.carebookie.dto.response.RatingHospitalResponseDto;
import com.spring.carebookie.dto.save.RatingDoctorSaveDto;
import com.spring.carebookie.dto.save.RatingHospitalSaveDto;
import com.spring.carebookie.dto.save.ServiceSaveDto;
import com.spring.carebookie.entity.RatingDoctorEntity;
import com.spring.carebookie.entity.RatingHospitalEntity;
import com.spring.carebookie.entity.ServiceEntity;
import com.spring.carebookie.entity.UserEntity;
import com.spring.carebookie.entity.WorkingDayDetailsEntity;
import com.spring.carebookie.exception.ResourceNotFoundException;
import com.spring.carebookie.repository.HospitalRepository;
import com.spring.carebookie.repository.RatingDoctorRepository;
import com.spring.carebookie.repository.RatingHospitalRepository;
import com.spring.carebookie.repository.ServiceRepository;
import com.spring.carebookie.repository.UserRepository;
import com.spring.carebookie.repository.WorkingDayDetailsRepository;

import io.netty.util.internal.StringUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommonService {

    private final HospitalRepository hospitalRepository;

    private final UserRepository userRepository;

    private final RatingHospitalRepository ratingHospitalRepository;

    private final RatingDoctorRepository ratingDoctorRepository;

    private final ServiceRepository serviceRepository;

    private final WorkingDayDetailsRepository workingDayDetailsRepository;

    private static final UserMapper USER_MAPPER = UserMapper.INSTANCE;

    private static final RatingDoctorMapper RATING_DOCTOR_MAPPER = RatingDoctorMapper.INSTANCE;

    private static final RatingHospitalMapper RATING_HOSPITAL_MAPPER = RatingHospitalMapper.INSTANCE;

    private static final ServiceMapper SERVICE_MAPPER = ServiceMapper.INSTANCE;

    public SearchHomeDto searchByKey(String key) {
        if (StringUtil.isNullOrEmpty(key)) key = null;

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

    /**
     * Service for hospital
     */
    public List<ServiceEntity> getAllServiceByHospitalId(String hospitalId) {
        return serviceRepository.getServiceEntityByHospitalId(hospitalId);
    }

    /**
     * Working day for hospital
     */
    public List<WorkingDayDetailsEntity> getAllWorkingDayDetailByHospitalId(String hospitalId) {
        return workingDayDetailsRepository.findAllByHospitalId(hospitalId);
    }

    /**
     * Rating
     */

    public List<RatingHospitalResponseDto> getAllRatingByHospitalId(String hospitalId) {

        List<RatingHospitalEntity> ratingHospitalEntities = ratingHospitalRepository.getAllByHospitalIdOrderByDateTime(hospitalId);
        List<RatingHospitalResponseDto> ratingResponseDtos = RATING_HOSPITAL_MAPPER.convertEntitiesToDtos(ratingHospitalEntities);
        ratingResponseDtos.forEach(r -> {
            UserEntity user = userRepository.findByUserId(r.getUserId());
            r.setFullName(user.getLastName() + " " + user.getFirstName());
            r.setImageUrl(user.getImageUrl());
        });

        return ratingResponseDtos;
    }

    public List<RatingDoctorResponseDto> getAllCommentByDoctorId(String doctorId) {

        List<RatingDoctorEntity> ratingDoctorEntities = ratingDoctorRepository.getAllByDoctorIdOrderByDateTime(doctorId);
        List<RatingDoctorResponseDto> ratingResponseDtos = RATING_DOCTOR_MAPPER.convertEntitiesToDtos(ratingDoctorEntities);
        ratingResponseDtos.forEach(r -> {
            UserEntity user = userRepository.findByUserId(r.getUserId());
            r.setFullName(user.getLastName() + " " + user.getFirstName());
            r.setImageUrl(user.getImageUrl());
        });

        return ratingResponseDtos;
    }

    public Map<String, Double> getHospitalStar() {

        return ratingHospitalRepository.getHospitalStar().
                stream().collect(Collectors.toMap(r -> r.getId(), r -> validateStar(r.getStar())));
    }

    public Map<String, Double> getDoctorStar() {
        return ratingDoctorRepository.getDoctorStar()
                .stream().collect(Collectors.toMap(r -> r.getId(), r -> validateStar(r.getStar())));
    }

    public RatingDoctorEntity saveRatingDoctor(RatingDoctorSaveDto dto) {
        return ratingDoctorRepository.save(RATING_DOCTOR_MAPPER.convertDtoToEntity(dto));
    }

    public RatingHospitalEntity saveRatingHospital(RatingHospitalSaveDto dto) {
        return ratingHospitalRepository.save(RATING_HOSPITAL_MAPPER.convertDtoToEntity(dto));
    }

    /**
     * Service
     */
    @Transactional
    public ServiceEntity saveService(ServiceSaveDto dto) {
        ServiceEntity entity = SERVICE_MAPPER.convertSaveToEntity(dto);
        return serviceRepository.save(entity);
    }

    @Transactional
    public void deleteService(Long serviceId) {
        serviceRepository.deleteById(serviceId);
    }

    @Transactional
    public ServiceEntity updateService(ServiceUpdateDto dto) {
        serviceRepository.updateService(dto.getServiceId(), dto.getServiceName(), dto.getPrice());
        return serviceRepository.findById(dto.getServiceId()).orElseThrow(() ->
                new ResourceNotFoundException("Service {} not found".replace("{}", dto.getServiceId().toString())));
    }

    /**
     * Private
     */
    private Double validateStar(Double star) {
        return star % star.intValue() >= 0.5 ? (double) star.intValue() + 1 : (double) star.intValue();
    }

}
