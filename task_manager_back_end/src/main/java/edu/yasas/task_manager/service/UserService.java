package edu.yasas.task_manager.service;

import edu.yasas.task_manager.dto.UserDto;
import edu.yasas.task_manager.dto.request.UserRequestDto;
import edu.yasas.task_manager.dto.response.UserResponseDto;


import org.springframework.http.ResponseEntity;

import java.util.UUID;

public interface UserService {

    ResponseEntity<UserResponseDto> persist(UserRequestDto userRequestDto);

    ResponseEntity<UserDto>getById(UUID id);

    ResponseEntity<UserDto> registerAdmin(UserRequestDto userRequestDto);

}
