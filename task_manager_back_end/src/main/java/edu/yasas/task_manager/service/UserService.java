package edu.yasas.task_manager.service;

import edu.yasas.task_manager.dto.UserDto;
import edu.yasas.task_manager.dto.request.UserRequestDto;
import edu.yasas.task_manager.dto.response.UserResponseDto;

import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<UserResponseDto> persist(UserRequestDto userRequestDto);

    ResponseEntity<UserDto>getById(String id);

}
