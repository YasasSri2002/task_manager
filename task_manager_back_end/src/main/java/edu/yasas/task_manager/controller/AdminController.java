package edu.yasas.task_manager.controller;

import edu.yasas.task_manager.dto.request.AdminRequestDto;
import edu.yasas.task_manager.dto.response.AdminResponseDto;
import edu.yasas.task_manager.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/register")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<AdminResponseDto>persist(AdminRequestDto adminRequestDto){
        return adminService.persist(adminRequestDto);
    }

}
