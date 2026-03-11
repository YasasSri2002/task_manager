package edu.yasas.task_manager.controller;

import edu.yasas.task_manager.dto.UserDto;
import edu.yasas.task_manager.dto.request.UserRequestDto;
import edu.yasas.task_manager.dto.response.UserResponseDto;
import edu.yasas.task_manager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/persist")
    public ResponseEntity<UserResponseDto>persist(@RequestBody UserRequestDto userRequestDto){
        return userService.persist(userRequestDto);
    }

    @GetMapping("/by-id")
    @PreAuthorize("hasAnyRole('USER','ADMIN','SUPER_ADMIN')")
    public ResponseEntity<UserDto>getById(@RequestParam String id){
        return userService.getById(id);
    }

    @PostMapping("/register/admin")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<UserDto>registerAdmin(@RequestBody UserRequestDto userRequestDto){
        return userService.registerAdmin(userRequestDto);
    }



}
