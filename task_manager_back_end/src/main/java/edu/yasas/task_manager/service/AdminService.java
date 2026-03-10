package edu.yasas.task_manager.service;

import edu.yasas.task_manager.dto.request.AdminRequestDto;
import edu.yasas.task_manager.dto.response.AdminResponseDto;
import org.springframework.http.ResponseEntity;

public interface AdminService {

    ResponseEntity<AdminResponseDto>persist(AdminRequestDto adminRequestDto);

}
