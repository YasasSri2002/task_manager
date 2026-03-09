package edu.yasas.task_manager.controller;

import edu.yasas.task_manager.dto.TaskDto;
import edu.yasas.task_manager.dto.request.TaskRequestDto;
import edu.yasas.task_manager.dto.response.TaskResponseDto;
import edu.yasas.task_manager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/task")

public class TaskController {

    private final TaskService taskService;

    @PostMapping("/persist")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TaskResponseDto>persist(@RequestBody TaskRequestDto taskRequestDto){
        return taskService.persist(taskRequestDto);
    }

    @GetMapping("/by-user-id")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<TaskDto>>getAllByUserId(@RequestParam String id){
        return taskService.getAllByUserId(id);
    }

    @PostMapping("/mark-as-complete")
    public ResponseEntity<Map<String,String>>markAsComplete(String id){
        return taskService.markAsCompleted(id);
    }

}
