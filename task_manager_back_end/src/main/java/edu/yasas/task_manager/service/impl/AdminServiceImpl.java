package edu.yasas.task_manager.service.impl;

import edu.yasas.task_manager.dto.request.AdminRequestDto;
import edu.yasas.task_manager.dto.response.AdminResponseDto;
import edu.yasas.task_manager.entity.AdminEntity;
import edu.yasas.task_manager.repository.AdminRepository;
import edu.yasas.task_manager.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    private AdminResponseDto getAdminResponseDto(AdminEntity adminEntity){
        AdminResponseDto adminResponseDto = new AdminResponseDto();
        adminResponseDto.setId(adminEntity.getId());
        adminResponseDto.setUsername(adminEntity.getUsername());
        adminResponseDto.setEmail(adminEntity.getEmail());
        return adminResponseDto;
    }

    @Override
    public ResponseEntity<AdminResponseDto> persist(AdminRequestDto adminRequestDto) {
        AdminEntity adminEntity = new AdminEntity();
        adminEntity.setUsername(adminRequestDto.getUsername());
        adminEntity.setEmail(adminRequestDto.getEmail());
        adminEntity.setPassword(adminRequestDto.getPassword());
        adminEntity.setRole("ROLE_ADMIN");

        AdminEntity saved = adminRepository.save(adminEntity);
        return ResponseEntity.ok(getAdminResponseDto(saved));
    }
}
