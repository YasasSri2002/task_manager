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
    public ResponseEntity<TaskDto>persist(@RequestBody TaskRequestDto taskRequestDto){
        return taskService.persist(taskRequestDto);
    }

    @GetMapping("/by-user-id")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<TaskDto>>getAllByUserId(@RequestParam String id){
        return taskService.getAllByUserId(id);
    }

    @PutMapping("/mark-as-complete")
    public ResponseEntity<Map<String,String>>markAsComplete(@RequestParam String id){
        return taskService.markAsCompleted(id);
    }

    @PutMapping("/mark-as-in-progress")
    public ResponseEntity<Map<String,String>>markAsInProgress(@RequestParam String id){
        return taskService.markAsInProgress(id);
    }

    @DeleteMapping("/by-id")
    public ResponseEntity<Map<String,String>>deleteById(@RequestParam String id){
        return taskService.deleteTask(id);
    }

    @DeleteMapping("/all/by-user/id")
    public ResponseEntity<Map<String, String>>deleteAllTasksByUserId(@RequestParam String id){
        return  taskService.deleteAllTaskOfUserByUserid(id);
    }

}
