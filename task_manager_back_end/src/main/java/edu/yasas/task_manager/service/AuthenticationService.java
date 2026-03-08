package edu.yasas.task_manager.service;

import edu.yasas.task_manager.dto.request.LoginRequestDto;
import edu.yasas.task_manager.dto.response.LoginResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {

 ResponseEntity<LoginResponseDto>login (LoginRequestDto loginRequestDto);

}
