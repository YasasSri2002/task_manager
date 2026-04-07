package edu.yasas.task_manager.controller;

import edu.yasas.task_manager.config.CustomUserDetail;
import edu.yasas.task_manager.dto.TaskDto;
import edu.yasas.task_manager.dto.request.TaskRequestDto;
import edu.yasas.task_manager.dto.response.TaskResponseDto;
import edu.yasas.task_manager.entity.TaskEntity;
import edu.yasas.task_manager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/task")

public class TaskController {

    private final TaskService taskService;

    @PostMapping("/persist")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','USER')")
    public ResponseEntity<TaskDto>persist(@RequestBody TaskRequestDto taskRequestDto){
        return taskService.persist(taskRequestDto);
    }

    @GetMapping("/by-user-id")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','USER')")
    public ResponseEntity<List<TaskDto>>getAllByUserId(@AuthenticationPrincipal CustomUserDetail userDetail){
        UUID userId = userDetail.getUserId();
        return taskService.getAllByUserId(userId);
    }

    @PutMapping("/mark-as-complete")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Map<String,String>>markAsComplete(@RequestParam String taskId){
        return taskService.markAsCompleted(taskId);
    }

    @PutMapping("/mark-as-in-progress")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Map<String,String>>markAsInProgress(@RequestParam String taskId){
        return taskService.markAsInProgress(taskId);
    }

    @DeleteMapping("/by-id")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Map<String,String>>deleteById(@RequestParam String taskId){
        return taskService.deleteTask(taskId);
    }

    @DeleteMapping("/all/by-user/id")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Map<String, String>>deleteAllTasksByUserId(@AuthenticationPrincipal CustomUserDetail userDetail){
        UUID id = userDetail.getUserId();
        return  taskService.deleteAllTaskOfUserByUserid(id);
    }

    @PutMapping("/update-task")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<TaskDto>updateTask(
            @RequestParam String taskId , @RequestBody TaskRequestDto taskRequestDto){
        return taskService.updateTaskbyId(taskId,taskRequestDto);
    }
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<List<TaskResponseDto>>getAllTask(){
        return taskService.getAllTasks();
    }

}
