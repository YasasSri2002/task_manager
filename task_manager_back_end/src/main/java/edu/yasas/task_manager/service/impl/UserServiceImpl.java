package edu.yasas.task_manager.service.impl;

import edu.yasas.task_manager.dto.TaskDto;
import edu.yasas.task_manager.dto.UserDto;
import edu.yasas.task_manager.dto.request.UserRequestDto;
import edu.yasas.task_manager.dto.response.TaskResponseDto;
import edu.yasas.task_manager.dto.response.UserResponseDto;
import edu.yasas.task_manager.entity.TaskEntity;
import edu.yasas.task_manager.entity.UserEntity;
import edu.yasas.task_manager.exceptions.EmailAlreadyExistException;
import edu.yasas.task_manager.exceptions.user_exceptions.UserNotFoundException;
import edu.yasas.task_manager.repository.UserRepository;
import edu.yasas.task_manager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static edu.yasas.task_manager.service.impl.TaskServiceImpl.getTaskDto;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


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

    @Override
    public ResponseEntity<UserResponseDto> persist(UserRequestDto userRequestDto) {

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

        UserEntity savedEntity = userRepository.save(userEntity);

        return ResponseEntity.ok(getUserResponseDto(savedEntity));
    }

    @Override
    public ResponseEntity<UserDto> getById(String id) {

        UserEntity userEntity = userRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new UserNotFoundException("User has been not found"));

        return ResponseEntity.ok(getUserDto(userEntity));
    }
}
