package edu.yasas.task_manager.service.impl;

import edu.yasas.task_manager.dto.TaskDto;
import edu.yasas.task_manager.dto.UserDto;
import edu.yasas.task_manager.dto.request.UserRequestDto;
import edu.yasas.task_manager.dto.response.TaskResponseDto;
import edu.yasas.task_manager.dto.response.UserResponseDto;
import edu.yasas.task_manager.entity.RolesEntity;
import edu.yasas.task_manager.entity.TaskEntity;
import edu.yasas.task_manager.entity.UserEntity;
import edu.yasas.task_manager.exceptions.EmailAlreadyExistException;
import edu.yasas.task_manager.exceptions.RoleNotFoundException;
import edu.yasas.task_manager.exceptions.user_exceptions.UserNotFoundException;
import edu.yasas.task_manager.repository.RolesRepository;
import edu.yasas.task_manager.repository.UserRepository;
import edu.yasas.task_manager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

import static edu.yasas.task_manager.service.impl.TaskServiceImpl.getTaskDto;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final RolesRepository rolesRepository;


    public static UserResponseDto getUserResponseDto(UserEntity userEntity){
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setId(userEntity.getId());
        userResponseDto.setEmail(userEntity.getEmail());
        userResponseDto.setFirstName(userEntity.getFirstName());
        userResponseDto.setLastName(userEntity.getLastName());
        userResponseDto.setUsername(userEntity.getUsername());
        if(userEntity.getTaskEntityList() != null){

            List<TaskEntity> taskEntityList = userEntity.getTaskEntityList();

            ArrayList<TaskDto> taskDtoArrayList = new ArrayList<>();

            taskEntityList.forEach(taskEntity ->
                    taskDtoArrayList.add(getTaskDto(taskEntity)));

            userResponseDto.setTaskDtoList(taskDtoArrayList);
        }
        return userResponseDto;
    }

    public static UserDto getUserDto(UserEntity userEntity){
        UserDto userDto = new UserDto();
        userDto.setId(userEntity.getId());
        userDto.setEmail(userEntity.getEmail());
        userDto.setFirstName(userEntity.getFirstName());
        userDto.setLastName(userEntity.getLastName());
        userDto.setUsername(userEntity.getUsername());
        return userDto;
    }

    private UserEntity getUserEntity(UserRequestDto userRequestDto, String role){
        Optional<UserEntity> byEmail =
                userRepository.findByEmail(userRequestDto.getEmail());

        if(byEmail.isPresent()){
            throw new EmailAlreadyExistException("This email has been registered before");
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(userRequestDto.getEmail());
        userEntity.setFirstName(userRequestDto.getFirstName());
        userEntity.setLastName(userRequestDto.getLastName());
        userEntity.setUsername(userRequestDto.getUsername());
        userEntity.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        RolesEntity userRole = rolesRepository.findByName(role)
                .orElseThrow(() -> new RoleNotFoundException("Role not found"));
        userEntity.setAuthorities(Set.of(userRole));

        return userEntity;
    }

    @Override
    public ResponseEntity<UserResponseDto> persist(UserRequestDto userRequestDto) {

        UserEntity userEntity = getUserEntity(userRequestDto,"ROLE_USER");
        UserEntity savedEntity = userRepository.save(userEntity);

        return ResponseEntity.ok(getUserResponseDto(savedEntity));
    }

    @Override
    public ResponseEntity<UserDto> getById(UUID id) {

        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User has been not found"));

        return ResponseEntity.ok(getUserDto(userEntity));
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<UserDto> registerAdmin(UserRequestDto userRequestDto) {
        UserEntity adminEnity = getUserEntity(userRequestDto, "ROLE_ADMIN");
        UserEntity save = userRepository.save(adminEnity);

        return ResponseEntity.ok(getUserDto(save));
    }
}
