package edu.yasas.task_manager.service.impl;

import edu.yasas.task_manager.dto.request.UserRequestDto;
import edu.yasas.task_manager.dto.response.UserResponseDto;
import edu.yasas.task_manager.entity.UserEntity;
import edu.yasas.task_manager.repository.UserRepository;
import edu.yasas.task_manager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    public UserResponseDto getUserResponseDto(UserEntity userEntity){
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setId(userEntity.getId());
        userResponseDto.setEmail(userEntity.getEmail());
        userResponseDto.setFirstName(userEntity.getFirstName());
        userResponseDto.setLastName(userEntity.getLastName());
        userResponseDto.setUsername(userEntity.getUsername());
        return userResponseDto;
    }

    @Override
    public ResponseEntity<UserResponseDto> persist(UserRequestDto userRequestDto) {

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(userRequestDto.getEmail());
        userEntity.setFirstName(userRequestDto.getFirstName());
        userEntity.setLastName(userRequestDto.getLastName());
        userEntity.setUsername(userRequestDto.getUsername());
        userEntity.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));

        UserEntity savedEntity = userRepository.save(userEntity);

        return ResponseEntity.ok(getUserResponseDto(savedEntity));
    }
}
