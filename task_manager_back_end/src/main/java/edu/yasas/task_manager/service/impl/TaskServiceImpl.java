package edu.yasas.task_manager.service.impl;

import edu.yasas.task_manager.dto.request.TaskRequestDto;
import edu.yasas.task_manager.dto.response.TaskResponseDto;
import edu.yasas.task_manager.entity.TaskEntity;
import edu.yasas.task_manager.entity.UserEntity;
import edu.yasas.task_manager.exceptions.user_exceptions.UserNotFoundException;
import edu.yasas.task_manager.repository.TaskRepository;
import edu.yasas.task_manager.repository.UserRepository;
import edu.yasas.task_manager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

import static edu.yasas.task_manager.service.impl.UserServiceImpl.getUserResponseDto;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    private final UserRepository userRepository;

    public TaskResponseDto getTaskResponseDto(TaskEntity taskEntity){
        TaskResponseDto taskResponseDto = new TaskResponseDto();
        taskResponseDto.setId(taskEntity.getId());
        taskResponseDto.setStatus(taskEntity.getStatus());
        taskResponseDto.setTitle(taskEntity.getTitle());
        taskResponseDto.setDescription(taskEntity.getDescription());
        taskResponseDto.setPriority(taskEntity.getPriority());
        taskResponseDto.setDueDate(taskEntity.getDueDate());
        taskResponseDto.setCreatedAt(taskEntity.getCreatedAt());
        taskResponseDto.setUpdatedAt(taskEntity.getUpdatedAt());
        taskResponseDto.setUserResponseDto(getUserResponseDto(taskEntity.getUserEntity()));

        return taskResponseDto;
    }

    @Override
    public ResponseEntity<TaskResponseDto> persist(TaskRequestDto taskRequestDto) {

        TaskEntity taskEntity = new TaskEntity();
        taskEntity.setTitle(taskRequestDto.getTitle());
        taskEntity.setDescription(taskRequestDto.getDescription());
        taskEntity.setPriority(taskRequestDto.getPriority());
        taskEntity.setDueDate(taskRequestDto.getDueDate());
        taskEntity.setCreatedAt(LocalDate.now());
        taskEntity.setUpdatedAt(LocalDate.now());
        taskEntity.setStatus("In Progress");

        UserEntity userEntity = userRepository.findById(UUID.fromString(taskRequestDto.getUserId()))
                .orElseThrow(() -> new UserNotFoundException("user has not found"));

        taskEntity.setUserEntity(userEntity);

        TaskEntity saved = taskRepository.save(taskEntity);

        return ResponseEntity.ok(getTaskResponseDto(saved));
    }
}
