package edu.yasas.task_manager.service.impl;

import edu.yasas.task_manager.dto.TaskDto;
import edu.yasas.task_manager.dto.request.TaskRequestDto;
import edu.yasas.task_manager.dto.response.TaskResponseDto;
import edu.yasas.task_manager.entity.TaskEntity;
import edu.yasas.task_manager.entity.UserEntity;
import edu.yasas.task_manager.exceptions.task_exceptions.TaskNotFoundException;
import edu.yasas.task_manager.exceptions.user_exceptions.UserNotFoundException;
import edu.yasas.task_manager.repository.TaskRepository;
import edu.yasas.task_manager.repository.UserRepository;
import edu.yasas.task_manager.service.TaskService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static edu.yasas.task_manager.service.impl.UserServiceImpl.getUserResponseDto;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    private final UserRepository userRepository;

    public static TaskResponseDto getTaskResponseDto(TaskEntity taskEntity){
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

    public static  TaskDto getTaskDto(TaskEntity taskEntity){

        TaskDto taskDto = new TaskDto();
        taskDto.setId(taskEntity.getId());
        taskDto.setStatus(taskEntity.getStatus());
        taskDto.setTitle(taskEntity.getTitle());
        taskDto.setDescription(taskEntity.getDescription());
        taskDto.setPriority(taskEntity.getPriority());
        taskDto.setDueDate(taskEntity.getDueDate());
        taskDto.setCreatedAt(taskEntity.getCreatedAt());
        taskDto.setUpdatedAt(taskEntity.getUpdatedAt());

        return taskDto;
    }



    @Override
    public ResponseEntity<TaskDto> persist(TaskRequestDto taskRequestDto) {

        TaskEntity taskEntity = new TaskEntity();
        taskEntity.setTitle(taskRequestDto.getTitle());
        taskEntity.setDescription(taskRequestDto.getDescription());
        taskEntity.setPriority(taskRequestDto.getPriority());
        taskEntity.setDueDate(taskRequestDto.getDueDate());
        taskEntity.setCreatedAt(LocalDate.now());
        taskEntity.setUpdatedAt(LocalDate.now());
        taskEntity.setStatus("TODO");

        UserEntity userEntity = userRepository.findById(UUID.fromString(taskRequestDto.getUserId()))
                .orElseThrow(() -> new UserNotFoundException("user has not found"));

        taskEntity.setUserEntity(userEntity);

        TaskEntity saved = taskRepository.save(taskEntity);

        return ResponseEntity.ok(getTaskDto(saved));
    }

    @Override
    public ResponseEntity<List<TaskDto>> getAllByUserId(String id) {

        ArrayList<TaskDto> taskDtoArrayList = new ArrayList<>();

        Iterable<TaskEntity> allByUserId =
                taskRepository.findAllByUserEntityId(UUID.fromString(id));

        allByUserId.forEach(taskEntity -> taskDtoArrayList.add(getTaskDto(taskEntity)));

        return ResponseEntity.ok(taskDtoArrayList);
    }

    @Override
    public ResponseEntity<Map<String, String>> markAsCompleted(String taskId) {

        TaskEntity taskEntity = taskRepository.findById(UUID.fromString(taskId)).orElseThrow(
                () -> new TaskNotFoundException("Task is not found"));
        taskEntity.setStatus("COMPLETED");

        TaskEntity saved = taskRepository.save(taskEntity);

        return ResponseEntity.ok(
                Map.of("Success", saved.getTitle() + " Marked as Completed"));
    }

    @Override
    public ResponseEntity<Map<String, String>> markAsInProgress(String taskId) {

        TaskEntity taskEntity = taskRepository.findById(UUID.fromString(taskId)).orElseThrow(() ->
                new TaskNotFoundException("Task is not found"));
        taskEntity.setStatus("IN_PROGRESS");

        TaskEntity saved = taskRepository.save(taskEntity);

        return ResponseEntity.ok(
                Map.of("Success", saved.getTitle() + " Mark as in progress"));
    }

    @Override
    public ResponseEntity<Map<String, String>> deleteTask(String taskId) {

        if(!taskRepository.existsById(UUID.fromString(taskId))){
            throw new TaskNotFoundException("task is not found");
        }

        taskRepository.deleteById(UUID.fromString(taskId));

        return ResponseEntity.ok(Map.of("Success", taskId +" has been deleted"));
    }

    @Override
    @Transactional
    public ResponseEntity<Map<String, String>> deleteAllTaskOfUserByUserid(String userId) {

        taskRepository.deleteAllByUserEntityId(UUID.fromString(userId));

        return ResponseEntity.ok(Map.of("Success",
                String.format("All tasks under user %s are deleted ",userId)));
    }
}
