package com.spring.carebookie.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.carebookie.common.mappers.UserMapper;
import com.spring.carebookie.dto.DoctorGetAllDto;
import com.spring.carebookie.dto.UserSaveDto;
import com.spring.carebookie.entity.UserEntity;
import com.spring.carebookie.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private static final UserMapper USER_MAPPER = UserMapper.INSTANCE;

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void save(UserSaveDto dto) {

        UserEntity entity = USER_MAPPER.convertSaveToEntity(dto);

        // Set some information into entity
        String userId = generateUserId(entity.getFirstName(), entity.getLastName(), entity.getEmail());
        entity.setUserId(userId);
        entity.setRoleId(4L);
        entity.setIsDisable(false);
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));

        userRepository.save(entity);
        log.info("Finished save user into database", entity.getFirstName() + entity.getLastName());

    }

    public List<DoctorGetAllDto> getAllDoctors() {
        return userRepository.getAllDoctors()
                .stream()
                .map(projection -> {
                    List<String> knowledges = Arrays.stream(projection.getKnowledge().split(","))
                            .collect(Collectors.toList());
                    DoctorGetAllDto dto = USER_MAPPER.convertProjectToDto(projection);
                    dto.setKnowledges(knowledges);
                   return dto;
                })
                .collect(Collectors.toList());
    }

    /**
     * Generate userId <br>
     * Example: firstName = "Oanh", lastName = "Pham Van", email = "poanh1002@gmail.com" <br>
     * Result is "OPpoanh1002"
     *
     * @param firstName
     * @param lastName
     * @param email
     * @return String
     */
    private String generateUserId(String firstName, String lastName, String email) {
        return firstName.toCharArray()[0] + String.valueOf(lastName.toCharArray()[0]) + email.split("@")[0];

    }
}
