package edu.yasas.task_manager.controller;

import edu.yasas.task_manager.config.CustomUserDetail;
import edu.yasas.task_manager.dto.TaskDto;
import edu.yasas.task_manager.dto.request.TaskRequestDto;
import edu.yasas.task_manager.dto.response.TaskResponseDto;
import edu.yasas.task_manager.entity.TaskEntity;
import edu.yasas.task_manager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<TaskDto>persist(
            @AuthenticationPrincipal CustomUserDetail userDetail,
            @RequestBody TaskRequestDto taskRequestDto
    ){
        UUID userId = userDetail.getUserId();
        return taskService.persist(userId,taskRequestDto);
    }

    @GetMapping("/by-user-id")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','USER')")
    public ResponseEntity<Page<TaskDto>>getAllByUserId(
            @AuthenticationPrincipal CustomUserDetail userDetail,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(defaultValue = "dueDate") String sortBy,
            @RequestParam(defaultValue = "asc") String orderBy){
        UUID userId = userDetail.getUserId();
        return taskService.getAllByUserId(userId,page, size,sortBy,orderBy,status,priority);
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
    public ResponseEntity<Page<TaskResponseDto>>getAllTask(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(defaultValue = "dueDate") String sortBy,
            @RequestParam(defaultValue = "asc") String orderBy
    ){
        return taskService.getAllTasks(page, size,sortBy,orderBy,status,priority);
    }

}
